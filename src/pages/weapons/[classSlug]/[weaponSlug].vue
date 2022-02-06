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
  // const recaptchaScript = document.createElement('script')
  // recaptchaScript.setAttribute('src', 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js')
  // document.head.appendChild(recaptchaScript)
  // modelPlayer = await import('js-3d-model-viewer')
  // const viewerElement = document.getElementById('viewer')
  // const scene = modelPlayer.prepareScene(viewerElement)
  // modelPlayer.loadObject(scene, '/models/truck.obj')

  // if (!Detector.webgl) Detector.addGetWebGLMessage();

  //       var renderer = new THREE.WebGLRenderer();

  //       var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
  //       var scene = new THREE.Scene();

  //       function init() {

  //           renderer.shadowMap.enabled = true;
  //           renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  //       }

  let container

  let camera, scene, renderer

  let mouseDown = false
  let autoRotationLocked = false
  let mouseX = 0
  let mouseY = 0

  const windowHalfX = window.innerWidth / 2
  const windowHalfY = window.innerHeight / 2

  let object

  init()
  animate()

  function init() {
    container = document.getElementById('model-viewer')

    camera = new THREE.PerspectiveCamera(35, container.offsetWidth / container.offsetHeight, 1, 2000)

    camera.position.y = 30
    camera.position.x = 5
    camera.position.z = 10
    camera.up = new THREE.Vector3(0, 0, 1)
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    scene = new THREE.Scene()

    // const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2)
    // scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.6)
    pointLight.castShadow = true
    pointLight.shadow.radius = 2
    camera.add(pointLight)
    scene.add(camera)

    // manager
    const manager = new THREE.LoadingManager(loadModel)

    manager.onProgress = function (item, loaded, total) {
      console.log(item, loaded, total)
    }

    // texture

    const textureLoader = new THREE.TextureLoader(manager)
    const texture = textureLoader.load('/models/light.png')

    function loadModel() {
      object.traverse(function (child) {
        if (child.isMesh) child.material.map = texture
      })

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
    loader.load(
      '/models/AK74.obj',
      function (obj) {
        object = obj
      },
      onProgress,
      onError
    )

    renderer = new THREE.WebGLRenderer({ alpha: true })
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

    const deltaX = evt.clientX - mouseX
    const deltaY = evt.clientY - mouseY
    mouseX = evt.clientX
    mouseY = evt.clientY
    rotateObject(deltaX, deltaY)
  }

  function onMouseDown(evt) {
    evt.preventDefault()

    mouseDown = true
    autoRotationLocked = true
    mouseX = evt.clientX
    mouseY = evt.clientY
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
  }

  addMouseHandler(container)

  function onWindowResize() {
    camera.aspect = container.offsetWidth / container.offsetHeight
    camera.updateProjectionMatrix()

    renderer.setSize(container.offsetWidth, container.offsetHeight)
  }

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
  <div class="arsenal h-full w-full">
    <div class="arsenal-grid relative flex h-full w-full flex-wrap items-stretch md:flex-nowrap">
      <div class="order-2 w-full flex-shrink-0 px-4 pb-8 md:order-1 md:w-[230px]">
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
            <img :src="`/images/weapons/${weaponType}/${weaponKey}.png`" class="h-8" />
            <span>{{ weaponKey }}</span>
          </router-link>
        </div>
      </div>

      <div
        class="order-1 w-full items-center overflow-hidden md:order-2 md:flex md:w-auto md:flex-auto md:flex-col md:justify-between"
      >
        <div class="overflow-hidden">
          <div
            class="flex w-full items-center justify-between space-x-2 overflow-x-auto overflow-y-hidden py-4 px-4 md:w-auto"
          >
            <router-link
              v-for="[soldierClass, classConfig] of Object.entries(classes)"
              :key="soldierClass"
              :to="`/weapons/${soldierClass}/${activeWeapon.name}`"
              class="group flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded border-2 border-transparent bg-gray-700 bg-opacity-60 transition-all hover:border-yellow-100"
              :class="{ 'border-yellow-100': props.classSlug === soldierClass }"
            >
              <img :src="`/images/classes/${classConfig.imageName}.png`" class="h-8 rounded" />

              <p class="mt-1 font-medium group-hover:text-yellow-100">
                {{ classConfig.name }}
              </p>
            </router-link>
          </div>

          <div class="mt-4 flex justify-center">
            <div class="flex items-center space-x-4 rounded bg-gray-800 px-4 py-2 text-yellow-100 md:mt-4">
              <FontAwesomeIcon :icon="faExclamationTriangle" />
              <span>{{ t('pageWorkingInProgress') }}</span>
            </div>
          </div>
        </div>

        <div class="mt-12 flex w-1/2 flex-auto flex-col items-center justify-center text-center">
          <h1 class="text-4xl">{{ props.weaponSlug }}</h1>
          <!-- <img :src="`/images/weapons/${activeWeapon.weaponType}/${activeWeapon.imageName}.png`" class="mt-4 block" /> -->
          <div id="model-viewer" class="h-full w-full border border-black"> </div>
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
