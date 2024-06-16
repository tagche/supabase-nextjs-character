import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default function ThreeMotion() {
    const mountRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const w = window.innerWidth
        const h = window.innerHeight

        // renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true })

        const elm = mountRef.current

        elm?.appendChild(renderer.domElement)

        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(w, h)

        // scene
        const scene = new THREE.Scene()

        // camera
        const camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000)
        camera.position.set(0, 0, +1000)
        // カメラコントローラーを作成
        const controls = new OrbitControls(camera, elm);
        controls.autoRotate = true;
        controls.maxDistance = 1000; // ズーム最大距離
        controls.maxPolarAngle = (Math.PI * 0.8) / 2; // 上限の角度
        controls.minPolarAngle = 0;

        // geometry
        const geometry = new THREE.PlaneGeometry(400, 400, 20, 20)
        // material
        const material = new THREE.MeshBasicMaterial({ wireframe: true, vortexColors: true })
        // mesh
        const mesh = new THREE.Mesh(geometry, material)
        mesh.rotation.x = Math.PI / 2 // 地面らしい角度にする
        scene.add(mesh)

        const tick = () => {
            controls.update()

            // ジオメトリの頂点座標情報
            const position = mesh.geometry.attributes.position
            for (let i = 0; i < position.count; i++) {
                // 各頂点のXYZ座標
                const x = position.getX(i)
                const y = position.getY(i)
                const z = position.getZ(i)

                // 高さを計算（PlaneGeometryの場合はZ座標）
                const nextZ = Math.sin(x * 0.03 + y * 0.02 + Date.now() * 0.002) * 30

                position.setX(i, x) // xとyは変更していないので省略しても大丈夫
                position.setY(i, y)
                position.setZ(i, nextZ)
            }

            // 頂点の更新が必要なことを伝える
            position.needsUpdate = true

            // レンダリング
            renderer.render(scene, camera)

            requestAnimationFrame(tick)
        }

        tick()

        return () => {
            elm?.removeChild(renderer.domElement)
        }
    }, [])

    return (
        <div ref={mountRef} id="threeMotion" />
    )
}
