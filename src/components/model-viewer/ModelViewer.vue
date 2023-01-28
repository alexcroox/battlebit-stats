<script setup lang="ts">
import * as THREE from 'three'
import { OBJLoader } from '../../lib/obj-loader.js'

const props = defineProps<{
  objectModel: {
    name: string
    filePath: string
    fov: number
  }
}>()

const objectStatus = $ref({
  isLoading: false,
  downloadPercentage: 0,
  hasError: false
})

onMounted(async () => {
  const container = document.getElementById('model-viewer')

  if (!container) {
    return
  }

  let object: THREE.Object3D
  const planeAspectRatio = 4 / 3
  const textureFilePath = '/models/light.png'
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

  function downloadModel(filePath: string) {
    // Remove our existing object from the scene before adding a new one
    if (object) {
      scene.remove(object)
    }

    objectStatus.isLoading = true

    objectLoader.load(
      filePath,
      function (newObject: THREE.Object3D) {
        objectStatus.isLoading = false
        objectStatus.hasError = false

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

        objectStatus.isLoading = false
        objectStatus.downloadPercentage = 0

        scene.add(object)

        adjustSceneSize()
      },
      onModelDownloadProgress,
      onModelDownloadError
    )
  }

  // Update our loading progress for a loading indicator on poor networks
  function onModelDownloadProgress(xhr: ProgressEvent) {
    if (xhr.lengthComputable) {
      const percentComplete = (xhr.loaded / xhr.total) * 100
      objectStatus.downloadPercentage = Math.round(percentComplete)
    }
  }

  function onModelDownloadError() {
    objectStatus.isLoading = false
    objectStatus.hasError = true
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
        handler: onInputStart
      },
      {
        types: ['mousemove', 'touchmove'],
        handler: onInputMove
      },
      {
        types: ['mouseup', 'touchend'],
        handler: onInputEnd
      }
    ]

    // Bind our events to the container dom element
    events.forEach((event) => event.types.forEach((type) => container.addEventListener(type, event.handler)))
  }

  function render() {
    // Auto rotate our model until the user starts interacting with it
    if (object && !isAutoRotationLocked) {
      object.rotation.y += 0.01
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
  <div id="model-viewer" />
</template>
