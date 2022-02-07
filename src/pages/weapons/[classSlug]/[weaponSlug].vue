<script setup lang="ts">
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import * as THREE from 'three'
import { classes, weapons } from '../../../lib/weapon-config'

import { OBJLoader } from '../../../lib/obj-loader.js'

const props = defineProps<{
  classSlug: string
  weaponSlug: string
}>()
const { t } = useI18n()

let modelPlayer

function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

const currentClassConfig = $computed(() => classes[props.classSlug])
const activeWeapon = $computed(() => weapons[props.weaponSlug])

onMounted(async () => {
  let container

  let camera, scene, renderer

  let fov = 0.25
  const planeAspectRatio = 4 / 3

  let mouseDown = false
  let autoRotationLocked = false
  let mouseX = 0
  let mouseY = 0

  let object

  init()
  animate()

  function init() {
    container = document.getElementById('model-viewer')

    camera = new THREE.PerspectiveCamera(35, container.offsetWidth / container.offsetHeight, 1, 5000)

    camera.position.y = 30
    camera.position.x = 10
    camera.position.z = 10
    camera.up = new THREE.Vector3(0, 0, 1)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene = new THREE.Scene()

    // const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2)
    // scene.add(ambientLight)

    // const pointLight = new THREE.PointLight(0xffffff, 0.6)
    // pointLight.castShadow = true
    // pointLight.shadow.radius = 2
    // camera.add(pointLight)

    const light = new THREE.SpotLight(0xf9fafb, 0.6)
    light.position.set(10, 20, 50)
    scene.add(light)

    scene.add(camera)

    // manager
    const manager = new THREE.LoadingManager()

    manager.onProgress = function (item, loaded, total) {
      console.log(item, loaded, total)
    }

    // texture

    const textureLoader = new THREE.TextureLoader(manager)
    const texture = textureLoader.load('/models/light.png')

    manager.onLoad = function () {
      object.traverse(function (child) {
        if (child.isMesh) {
          child.material.map = texture

          child.geometry.computeVertexNormals()
        }
      })

      // object.antialias = true

      // object.position.y = 0
      // object.rotation.z = (90 * Math.PI) / 180
      // object.rotation.x = (-90 * Math.PI) / 180
      scene.add(object)
    }

    function onProgress(xhr) {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100
        console.log(`model ${Math.round(percentComplete, 2)}% downloaded`)
      }
    }

    function onError() {}

    const loader = new OBJLoader(manager)

    function downloadModel() {
      console.log('Download', activeWeapon.imageName)

      loader.load(
        `/images/weapons/${activeWeapon.imageName}.obj`,
        function (obj) {
          if (object) {
            scene.remove(object)
          }

          fov = activeWeapon.modelFov

          object = obj

          onWindowResize()
        },
        onProgress,
        onError
      )
    }

    if (activeWeapon.hasModel) {
      downloadModel()
    }

    watch(
      () => activeWeapon.imageName,
      () => {
        if (activeWeapon.hasModel) {
          downloadModel()
        } else {
          scene.remove(object)
        }
      }
    )

    renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.offsetWidth, container.offsetHeight)
    container.appendChild(renderer.domElement)

    window.addEventListener('resize', onWindowResize)
  }

  function rotateObject(deltaX, deltaY) {
    object.rotation.z += deltaX / 100
    object.rotation.y += deltaY / 100
  }

  function onMouseMove(evt) {
    if (!mouseDown) {
      return
    }

    evt.preventDefault()

    let eventX
    let eventY

    if (evt.changedTouches) {
      const rect = container.getBoundingClientRect()

      eventX = +(evt.changedTouches[0].pageX - rect.left)
      eventY = evt.changedTouches[0].pageY - rect.top
    } else {
      eventX = evt.clientX
      eventY = evt.clientY
    }

    const deltaX = eventX - mouseX
    const deltaY = eventY - mouseY
    mouseX = eventX
    mouseY = eventY
    rotateObject(deltaX, deltaY)
  }

  function onMouseDown(evt) {
    evt.preventDefault()

    let eventX
    let eventY

    if (evt.changedTouches) {
      const rect = container.getBoundingClientRect()

      eventX = +(evt.changedTouches[0].pageX - rect.left)
      eventY = evt.changedTouches[0].pageY - rect.top
    } else {
      eventX = evt.clientX
      eventY = evt.clientY
    }

    mouseDown = true
    autoRotationLocked = true
    mouseX = eventX
    mouseY = eventY
  }

  function onMouseUp(evt) {
    evt.preventDefault()
    mouseDown = false

    setTimeout(() => {
      autoRotationLocked = false
    }, 2000)
  }

  function addMouseHandler(canvas) {
    canvas.addEventListener(
      'mousemove',
      function (e) {
        onMouseMove(e)
      },
      false
    )
    canvas.addEventListener(
      'mousedown',
      function (e) {
        onMouseDown(e)
      },
      false
    )
    canvas.addEventListener(
      'mouseup',
      function (e) {
        onMouseUp(e)
      },
      false
    )
    canvas.addEventListener(
      'touchmove',
      function (e) {
        onMouseMove(e)
      },
      false
    )
    canvas.addEventListener(
      'touchstart',
      function (e) {
        onMouseDown(e)
      },
      false
    )
    canvas.addEventListener(
      'touchend',
      function (e) {
        onMouseUp(e)
      },
      false
    )
  }

  addMouseHandler(container)

  function onWindowResize() {
    camera.aspect = container.offsetWidth / container.offsetHeight

    if (camera.aspect > planeAspectRatio) {
      // window too large
      camera.fov = fov
    } else {
      // window too narrow
      const cameraHeight = Math.tan(THREE.MathUtils.degToRad(fov / 2))
      const ratio = camera.aspect / planeAspectRatio
      const newCameraHeight = cameraHeight / ratio
      camera.fov = THREE.MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2
    }

    camera.updateProjectionMatrix()

    renderer.setSize(container.offsetWidth, container.offsetHeight)
  }

  onWindowResize()

  function animate() {
    if (object && !autoRotationLocked) {
      object.rotation.z += 0.01
    }

    requestAnimationFrame(animate)
    render()
  }

  function render() {
    camera.lookAt(scene.position)

    renderer.render(scene, camera)
  }
})
</script>

<template>
  <div class="arsenal h-[calc(100vh-90px)] overflow-hidden">
    <div class="arsenal-grid relative flex h-full w-full flex-col md:flex-row">
      <div
        class="scrollbar-vertical relative z-20 order-2 h-full w-full overflow-y-auto px-4 pb-8 md:order-1 md:w-[260px]"
      >
        <div v-for="[weaponType, weaponTypeWeapons] in Object.entries(currentClassConfig.weapons)" :key="weaponType">
          <h2 class="container-padding-x mt-6 capitalize">{{ weaponType.replace('-', ' ') }}</h2>

          <router-link
            v-for="weaponKey in weaponTypeWeapons"
            :key="weaponKey"
            :to="`/weapons/${props.classSlug}/${weaponKey}`"
            class="container-padding-x mt-2 flex items-center space-x-4 rounded border-2 border-transparent bg-gray-900 py-1 hover:text-yellow-100"
            :class="{ 'border-yellow-100': props.weaponSlug === weaponKey }"
            @click="scrollToTop()"
          >
            <img :src="`/images/weapons/${weaponKey}.png`" class="h-8" />
            <span v-if="weapons[weaponKey]">{{ weapons[weaponKey].name }}</span>
          </router-link>
        </div>
      </div>

      <div
        class="relative order-1 w-full items-center md:order-2 md:flex md:w-auto md:flex-auto md:flex-col md:justify-between md:overflow-hidden"
      >
        <div id="model-viewer" class="absolute left-0 right-0 z-10 h-[65vh] md:bottom-0 md:top-0 md:h-auto" />

        <div class="md:overflow-hidden">
          <div
            class="scrollbar-horizontal flex w-full items-center justify-between space-x-2 overflow-x-auto overflow-y-hidden py-4 px-4 md:w-auto"
          >
            <router-link
              v-for="[soldierClass, classConfig] of Object.entries(classes)"
              :key="soldierClass"
              :to="`/weapons/${soldierClass}/${classes[soldierClass].demoWeapon}`"
              class="group relative z-20 flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded border-2 border-transparent bg-gray-700 bg-opacity-60 transition-all hover:border-yellow-100"
              :class="{ 'border-yellow-100': props.classSlug === soldierClass }"
            >
              <img :src="`/images/classes/${classConfig.imageName}.png`" class="h-8 rounded" />

              <p class="mt-1 font-medium group-hover:text-yellow-100">
                {{ classConfig.name }}
              </p>
            </router-link>
          </div>

          <!-- <div class="mt-4 flex justify-center">
            <div class="flex items-center space-x-4 rounded bg-gray-800 px-4 py-2 text-yellow-100 md:mt-4">
              <FontAwesomeIcon :icon="faExclamationTriangle" />
              <span>{{ t('pageWorkingInProgress') }}</span>
            </div>
          </div> -->
        </div>

        <div class="mt-6 flex w-full flex-auto flex-col items-center text-center md:mt-12">
          <div class="relative h-[20vh] w-full md:h-full">
            <h1 class="position-center-x absolute z-20 text-2xl md:text-4xl">{{ props.weaponSlug }}</h1>

            <img
              v-if="!activeWeapon.hasModel"
              :src="`/images/weapons/${activeWeapon.imageName}.png`"
              class="position-center absolute"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.arsenal {
  background: #384251;
  background: radial-gradient(ellipse at center, #384251, #111927);
}
.arsenal-grid {
  background-image: repeating-linear-gradient(#374151 0 1px, transparent 1px 100%),
    repeating-linear-gradient(90deg, #374151 0 1px, transparent 1px 100%);
  background-size: 71px 71px;
}
</style>
