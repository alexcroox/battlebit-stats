<script setup lang="ts">
import * as THREE from 'three'
import { OBJLoader } from '~/lib/objLoader.js'

const props = defineProps<{
  objectModel: {
    name: string
    filePath: string
    fov: number
  }
}>()

const objectStatus = ref({
  isLoading: false,
  downloadPercentage: 0,
  hasError: false,
})

let showLoadingIndicator = ref(false)

onMounted(async () => {
  const container = document.getElementById('model-viewer')

  if (!container) {
    return
  }

  let object: THREE.Object3D
  const planeAspectRatio = 4 / 3
  const textureFilePath = 'https://asset.battlebitstats.com/weapons/light.png'
  let fov = 0.25
  let isUserMovingObject = false
  let isAutoRotationLocked = false
  let inputPositionX = 0
  let inputPositionY = 0

  let containerWidth = container.offsetWidth
  let containerHeight = container.offsetHeight

  // Set the camera back from the model and lower the scene distance as our models are up close
  const camera = new THREE.PerspectiveCamera(35, containerWidth / containerHeight, 1, 500)
  camera.position.y = 10
  camera.position.x = 30
  camera.position.z = 10

  // Our game models are exported on the wrong axis, let's flip
  camera.up = new THREE.Vector3(0, 1, 0)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  const scene = new THREE.Scene()
  scene.add(camera)

  // Add spotlight pointing at the model
  const light = new THREE.SpotLight(0xf9fafb, 0.6)
  light.position.set(50, 50, 50)
  scene.add(light)

  // Make scene background transparent
  const renderer = new THREE.WebGLRenderer({ alpha: true })
  const clock = new THREE.Clock()
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(containerWidth, containerHeight)

  // Add our scene to the DOM!
  container.appendChild(renderer.domElement)

  const loadingManager = new THREE.LoadingManager()
  const objectLoader = new OBJLoader(loadingManager)
  const textureLoader = new THREE.TextureLoader(loadingManager)
  // Add a solid white texture to the model to brighten it under the lighting
  const texture = textureLoader.load(textureFilePath)

  let currentlyDisplayedFilePath = ''

  function downloadModel(filePath: string) {
    // Remove our existing object from the scene before adding a new one
    if (object) {
      scene.remove(object)
    }
    const longLoadingIndicatorTimeout = setTimeout(() => {
      showLoadingIndicator.value = true
    }, 300)

    objectStatus.value.isLoading = true
    objectStatus.value.downloadPercentage = 0
    currentlyDisplayedFilePath = filePath

    objectLoader.load(
      filePath,
      function (newObject: THREE.Object3D) {
        // in case of concurrent loads, only add the model if it's the one we want
        // and ignore the older requests
        if (currentlyDisplayedFilePath !== filePath) {
          return
        }

        for (let i = scene.children.length - 1; i >= 0; i--) {
          const child = scene.children[i]
          if (child.type === 'Mesh') {
            scene.remove(child)
          }
        }

        objectStatus.value.isLoading = false
        objectStatus.value.hasError = false
        objectStatus.value.downloadPercentage = 0

        showLoadingIndicator.value = false

        clearTimeout(longLoadingIndicatorTimeout)

        fov = props.objectModel.fov
        object = newObject

        // Calculate the center of the actual model, rather than using the object's geometric center
        const boxCenter = new THREE.Box3().setFromObject(object).getCenter(new THREE.Vector3())
        boxCenter.multiplyScalar(-1)

        object.traverse(function (child) {
          if (child.isMesh) {
            child.material.map = texture

            // Apply our model center offset
            child.geometry.computeVertexNormals()
            child.geometry.translate(boxCenter.x, boxCenter.y, boxCenter.z)
          }
        })

        clock.stop()
        clock.start()
        scene.add(object)

        adjustSceneSize()
      },

      // Update our loading progress for a loading indicator on poor networks
      function (xhr: ProgressEvent) {
        if (xhr.lengthComputable && currentlyDisplayedFilePath === filePath) {
          const percentComplete = (xhr.loaded / xhr.total) * 100

          objectStatus.value.downloadPercentage = Math.round(percentComplete)
        }
      },

      function () {
        objectStatus.value.isLoading = false
        objectStatus.value.hasError = true

        showLoadingIndicator.value = false

        clearTimeout(longLoadingIndicatorTimeout)
      },
    )
  }

  // If our screen size or model has changed, update the camera and renderer
  function adjustSceneSize() {
    containerWidth = container?.offsetWidth || 0
    containerHeight = container?.offsetHeight || 0

    camera.aspect = containerWidth / containerHeight

    if (camera.aspect > planeAspectRatio) {
      // Window too large
      camera.fov = fov
    } else {
      // Window too narrow
      const cameraHeight = Math.tan(THREE.MathUtils.degToRad(fov / 2))
      const ratio = camera.aspect / planeAspectRatio
      const newCameraHeight = cameraHeight / ratio
      camera.fov = THREE.MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2
    }

    camera.updateProjectionMatrix()
    camera.lookAt(scene.position)

    renderer.setSize(containerWidth, containerHeight)
  }

  function rotateObject(deltaX: number, deltaY: number) {
    object.rotation.y += deltaX / 100
    object.rotation.z += deltaY / 100
  }

  // Mouse click or first touch
  // Set the initial input positions so we can rotate the model based on this starting point
  function onInputStart(event: MouseEvent | TouchEvent) {
    event.preventDefault()

    if (event instanceof TouchEvent) {
      const containerBoundingBox = container?.getBoundingClientRect()

      if (containerBoundingBox) {
        inputPositionX = +(event.changedTouches[0].pageX - containerBoundingBox.left)
        inputPositionY = event.changedTouches[0].pageY - containerBoundingBox.top
      }
    } else {
      inputPositionX = event.clientX
      inputPositionY = event.clientY
    }

    isUserMovingObject = true
    isAutoRotationLocked = true
    clock.stop()
  }

  // Mouse or touch move after click/touch hold
  // Rotate the obect based on the different between the current movement and the first interaction
  function onInputMove(event: MouseEvent | TouchEvent) {
    // If we've not received an initial input position then we have nothing to compare to
    if (!isUserMovingObject) {
      return
    }

    event.preventDefault()

    let eventX = 0
    let eventY = 0

    if (event instanceof TouchEvent) {
      const containerBoundingBox = container?.getBoundingClientRect()

      if (containerBoundingBox) {
        eventX = +(event.changedTouches[0].pageX - containerBoundingBox.left)
        eventY = event.changedTouches[0].pageY - containerBoundingBox.top
      }
    } else {
      eventX = event.clientX
      eventY = event.clientY
    }

    // Calculate how much we've moved and therefore how much to rotate the object by
    const deltaX = eventX - inputPositionX
    const deltaY = eventY - inputPositionY

    // Set our initial input positions to the latest so the next delta is only based on the previous movement
    // and not since the first input
    inputPositionX = eventX
    inputPositionY = eventY

    rotateObject(deltaX, deltaY)
  }

  // If we lift the mouse button or stop touching then wait 2 seconds before auto rotating the object again
  function onInputEnd(event: MouseEvent | TouchEvent) {
    event.preventDefault()

    isUserMovingObject = false

    setTimeout(() => {
      isAutoRotationLocked = false
      clock.start()
    }, 2000)
  }

  function addEventListeners() {
    // We need to adjust our camera and scene size when the window is resized
    window.addEventListener('resize', adjustSceneSize)

    if (!container) {
      return
    }

    const events = [
      {
        types: ['mousedown', 'touchstart'],
        handler: onInputStart,
      },
      {
        types: ['mousemove', 'touchmove'],
        handler: onInputMove,
      },
      {
        types: ['mouseup', 'touchend'],
        handler: onInputEnd,
      },
    ]

    // Bind our events to the container dom element
    events.forEach(event => event.types.forEach(type => container.addEventListener(type, event.handler)))
  }

  function render() {
    // Auto rotate our model until the user starts interacting with it
    if (object && !isAutoRotationLocked) {
      // adjust delta based on time since last frame
      // to ensure smooth animation even if frame rate is not consistent
      const delta = clock.getDelta()
      object.rotation.y += 1 * delta
    }

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  // Watch for our object prop changing and either download a new model or remove the existing one
  // This also triggers on first run before watching for changes
  watchEffect(() => {
    if (props.objectModel.filePath) {
      downloadModel(props.objectModel.filePath)
    } else if (object) {
      scene.remove(object)
    }
  })

  addEventListeners()
  render()
})
</script>

<template>
  <div class="absolute w-full h-full">
    <div
      v-if="objectStatus.isLoading && showLoadingIndicator"
      class="absolute w-full position-center mt-44 md:mt-0"
    >
      <div class="text-center">
        <div class="text-lg text-white">{{ $t('loadingModel') }}</div>
      </div>

      <div class="w-full h-1 max-w-sm mx-auto mt-3 bg-gray-900 rounded">
        <div
          class="h-1 bg-yellow-200 rounded"
          :style="{ width: `${objectStatus.downloadPercentage || 10}%` }"
        ></div>
      </div>
    </div>

    <div id="model-viewer" class="w-full h-full" />
  </div>
</template>
