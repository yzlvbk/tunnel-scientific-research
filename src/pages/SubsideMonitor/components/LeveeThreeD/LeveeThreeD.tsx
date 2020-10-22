import * as React from 'react';
import * as THREE from 'three'
import { Lut } from './Lut';
import OrbitControls from 'three-orbitcontrols'
import style from '../../style/index.module.less'

var params = {
  colorMap: 'rainbow',
};
var lut = new Lut();
lut.setColorMap(params.colorMap);
lut.setMax(10);
lut.setMin(-10);

//  动态整合vertices
var vertices: any[] = []
for (let i = 0; i < 120; i++) {
  const distance = i * 2 - 120
  vertices.push(new THREE.Vector3(distance, 0, -240))
  vertices.push(new THREE.Vector3(distance, 0, -40))
  vertices.push(new THREE.Vector3(distance, 100, -40))
  vertices.push(new THREE.Vector3(distance, 100, 0))
  vertices.push(new THREE.Vector3(distance, 121, 0))
  vertices.push(new THREE.Vector3(distance, 148, -87))
  vertices.push(new THREE.Vector3(distance, 159, -87))
  vertices.push(new THREE.Vector3(distance, 159, -240))
}

// 4个点生成2个三角形
function buildTriangle(a: number, b: number, c: number, d: number) {
  return [b, a, c, b, d, c]
}

// 相邻两组点计算索引
function buildAdjacentIndex(arr1: number[], arr2: number[]) {
  let indexArry: number[] = []
  for (let i = 0, x = (arr1.length - 1); i < x; i++) {
    const index = buildTriangle(arr1[i], arr1[i + 1], arr2[i], arr2[i + 1])
    indexArry = indexArry.concat(index)
  }
  return indexArry
}

// 计算索引 type=8为8个一组，    type=2为2个一组计算top face 
function computedIndex(num: number, type = 8) {
  const IndexArry = [] // 按照length分成索引数组
  let restleIndexArry: number[] = [] // 最终计算的索引
  // 将索引6进行分组，6个一组
  for (let i = 0, x = num; i < x; i++) {
    const index = Math.floor(i / type)
    if (i % type === 0) {
      IndexArry.push([])
    }
    // @ts-ignore
    IndexArry[index].push(i)
  }

  // 相邻两组点进行计算索引
  for (let i = 0, x = IndexArry.length - 1; i < x; i++) {
    const resultIndex = buildAdjacentIndex(IndexArry[i], IndexArry[i + 1])
    restleIndexArry = restleIndexArry.concat(resultIndex)
  }
  // console.log('restleIndexArry', restleIndexArry);
  return restleIndexArry
}

// 按照索引build face
function accordIndexBuildFace(indexArry: number[]) {
  const faceArry = []
  for (let i = 0, x = indexArry.length; i < x; i += 3) {
    faceArry.push(new THREE.Face3(indexArry[i], indexArry[i + 1], indexArry[i + 2]))
  }
  return faceArry
}

// 绘制大堤顶部
function buildTopFaces(vertices: any, group: any) {
  let geometry = new THREE.Geometry(); //声明一个空几何体对象
  //类型数组创建顶点位置position数据
  geometry.vertices = vertices
  // 启用顶点颜色
  const indexArry = computedIndex(vertices.length, 4)

  var color1: any = lut.getColor(vertices[2].z);
  var color2: any = lut.getColor(vertices[6].z);
  var faces = accordIndexBuildFace(indexArry).map((face, index) => {
    if ((index % 6) % 2 === 0) {
      face.vertexColors = [
        new THREE.Color(`rgb(${Math.floor(color1.r * 255)}, ${Math.floor(color1.g * 255)}, ${Math.floor(color1.b * 255)})`), // 1
        new THREE.Color(`rgb(${Math.floor(color1.r * 255)}, ${Math.floor(color1.g * 255)}, ${Math.floor(color1.b * 255)})`), //1
        new THREE.Color(`rgb(${Math.floor(color2.r * 255)}, ${Math.floor(color2.g * 255)}, ${Math.floor(color2.b * 255)})`) // 2
      ]
    } else if ((index % 6) % 2 === 1) {
      face.vertexColors = [
        new THREE.Color(`rgb(${Math.floor(color1.r * 255)}, ${Math.floor(color1.g * 255)}, ${Math.floor(color1.b * 255)})`), // 1
        new THREE.Color(`rgb(${Math.floor(color2.r * 255)}, ${Math.floor(color2.g * 255)}, ${Math.floor(color2.b * 255)})`), //2
        new THREE.Color(`rgb(${Math.floor(color2.r * 255)}, ${Math.floor(color2.g * 255)}, ${Math.floor(color2.b * 255)})`) // 2
      ]
    }
    return face
  })

  geometry.faces = faces

  geometry.computeFaceNormals()

  // geometry.rotateX(270 * Math.PI / 180);
  // geometry.translate(0, -1000, 0);

  // let color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
  //材质对象
  // @ts-ignore
  var material = new THREE.MeshPhongMaterial({
    // color, //三角面颜色
    // vertexColors: THREE.VertexColors, //以顶点颜色为准
    // @ts-ignore
    vertexColors: THREE.FaceColors,
    side: THREE.DoubleSide //两面可见
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  // scene.add(mesh); //网格模型添加到场景中
  group.add(mesh)
}

// 绘制黄河底
function buildRiverBase(group: any) {
  let geometry = new THREE.Geometry(); //声明一个空几何体对象

  var vertices = [
    new THREE.Vector3(120, 0, -40),
    new THREE.Vector3(120, 100, -40), //2

    new THREE.Vector3(55, 0, -40),
    new THREE.Vector3(55, 100, -40), // 10

    new THREE.Vector3(45, 0, -40),
    new THREE.Vector3(45, 100, -40),

    new THREE.Vector3(30, 0, -40),
    new THREE.Vector3(30, 100, -40),

    new THREE.Vector3(0, 0, -40),
    new THREE.Vector3(0, 100, -40),

    new THREE.Vector3(-15, 0, -40),
    new THREE.Vector3(-15, 100, -40),

    new THREE.Vector3(-30, 0, -40),
    new THREE.Vector3(-30, 100, -40),

    new THREE.Vector3(-45, 0, -40),
    new THREE.Vector3(-45, 100, -40),

    new THREE.Vector3(-55, 0, -40),
    new THREE.Vector3(-55, 100, -40),

    new THREE.Vector3(-120, 0, -40),
    new THREE.Vector3(-120, 100, -40),
  ]
  //类型数组创建顶点位置position数据
  geometry.vertices = vertices

  const indexArry = computedIndex(vertices.length, 2)
  var faces = accordIndexBuildFace(indexArry)
  geometry.faces = faces

  geometry.computeFaceNormals()


  // geometry.rotateX(270 * Math.PI / 180);
  // geometry.translate(0, -1000, 0);

  // let color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
  //材质对象
  var material = new THREE.MeshPhongMaterial({
    color: 'blue', //三角面颜色
    side: THREE.DoubleSide //两面可见
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  // scene.add(mesh); //网格模型添加到场景中
  group.add(mesh)
}

// 绘制侧面
function buildSide(vertices: any, group: any) {
  var geometry = new THREE.Geometry(); //声明一个空几何体对象
  geometry.vertices = vertices

  var faces = [
    new THREE.Face3(0, 1, 5),
    new THREE.Face3(1, 2, 5),
    new THREE.Face3(2, 3, 5),
    new THREE.Face3(3, 4, 5),
    new THREE.Face3(0, 5, 7),
    new THREE.Face3(5, 6, 7)
  ]
  geometry.faces = faces
  geometry.computeFaceNormals()

  // geometry.rotateX(270 * Math.PI / 180);
  // geometry.translate(0, -1000, 0);
  //材质对象
  var material = new THREE.MeshPhongMaterial({
    color: 'yellow', //三角面颜色
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide //两面可见
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  // scene.add(mesh); //网格模型添加到场景中
  group.add(mesh)
}

// 绘制正面
function buildFront(group: any) {
  let geometry = new THREE.Geometry(); //声明一个空几何体对象
  var verticesArry = [
    vertices[0],
    vertices[1],
    vertices[vertices.length - 8],
    vertices[vertices.length - 7],
  ]
  //类型数组创建顶点位置position数据
  geometry.vertices = verticesArry

  const indexArry = computedIndex(verticesArry.length, 2)
  var faces = accordIndexBuildFace(indexArry)
  geometry.faces = faces

  geometry.computeFaceNormals()

  //材质对象
  var material = new THREE.MeshPhongMaterial({
    color: 'yellow', //三角面颜色
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide //两面可见
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  // scene.add(mesh); //网格模型添加到场景中
  group.add(mesh)
}

// 绘制后面
function buildBack(group: any) {
  let geometry = new THREE.Geometry(); //声明一个空几何体对象

  var verticesArry = [
    vertices[5],
    vertices[6],
    vertices[7],
    vertices[vertices.length - 3],
    vertices[vertices.length - 2],
    vertices[vertices.length - 1]
  ]
  //类型数组创建顶点位置position数据
  geometry.vertices = verticesArry

  const indexArry = computedIndex(verticesArry.length, 3)
  var faces = accordIndexBuildFace(indexArry)
  geometry.faces = faces

  geometry.computeFaceNormals()

  //材质对象
  var material = new THREE.MeshPhongMaterial({
    color: 'yellow', //三角面颜色
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide //两面可见
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  group.add(mesh)
}

export default class LeveeThreeD extends React.Component<{}> {
  container: any
  warp: any
  containerWidth: any
  containerHeight: any
  scene = new THREE.Scene();
  group = new THREE.Group();
  camera: any

  componentDidMount() {
    this.container = document.querySelector(`.${style['levee-threeD-warp']}`)
    this.warp = this.container?.getBoundingClientRect()
    this.containerWidth = this.warp!.right - this.warp!.left
    this.containerHeight = this.warp!.bottom - this.warp!.top
    this.initThree();
  }

  public drawLevee = () => {
    // 绘制河底
    buildRiverBase(this.group)

    // 绘制侧边
    var siceVertices1 = [
      vertices[0],
      vertices[1],
      vertices[2],
      vertices[3],
      vertices[4],
      vertices[5],
      vertices[6],
      vertices[7],
    ]
    buildSide(siceVertices1, this.group)
    var siceVertices2 = [
      vertices[vertices.length - 8],
      vertices[vertices.length - 7],
      vertices[vertices.length - 6],
      vertices[vertices.length - 5],
      vertices[vertices.length - 4],
      vertices[vertices.length - 3],
      vertices[vertices.length - 2],
      vertices[vertices.length - 1],
    ]
    buildSide(siceVertices2, this.group)

    // 绘制正面
    buildFront(this.group)

    // 绘制背面
    buildBack(this.group)

    // 将坐标点安8个分组，整合相邻两组top点进行绘制top部分
    var topFacesArry = []
    for (let i = 0, x = ((vertices.length) / 8 - 1); i < x; i++) {
      const faces = []
      faces.push(vertices[i * 8 + 2])
      faces.push(vertices[i * 8 + 3])
      faces.push(vertices[i * 8 + 4])
      faces.push(vertices[i * 8 + 5])
      faces.push(vertices[(i + 1) * 8 + 2])
      faces.push(vertices[(i + 1) * 8 + 3])
      faces.push(vertices[(i + 1) * 8 + 4])
      faces.push(vertices[(i + 1) * 8 + 5])
      topFacesArry.push(faces)
    }
    // 绘制顶部
    topFacesArry.forEach(item => {
      buildTopFaces(item, this.group)
    })
  }

  public initLight = () => {
    // 方向光
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 100, 100);
    this.scene.add(directionalLight);

    // 聚光光源
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, -50, -1000);
    spotLight.angle = Math.PI / 6
    // scene.add(spotLight);//光对象添加到scene场景中

    //环境光
    var ambient = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambient);

    // 辅助光源
    // var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)
    // scene.add(directionalLightHelper)
  }

  public initCamera = () => {
    const k = this.containerWidth / this.containerHeight
    const s = 200
    this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, -10000000, 10000000);
    this.camera.position.set(-100, 30, 0); //设置相机位置
    this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
  }

  public initRenderer = () => {
    var renderer = new THREE.WebGLRenderer();
    // @ts-ignore
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      // @ts-ignore
      canvas: this.container.querySelector('canvas')
    })
    renderer.setSize(this.containerWidth, this.containerHeight)
    renderer.setClearColor(0xb9d3ff, 1)
    const render = () => {
      renderer.render(this.scene, this.camera)
      requestAnimationFrame(render)
    }
    render()
    // @ts-ignore
    new OrbitControls(this.camera, renderer.domElement)
    // 取消添加OrbitControls时的边框线
    renderer.domElement.removeAttribute('tabindex')
  }

  public initThree = () => {
    this.group.translateZ(50);
    this.group.translateY(120);
    this.group.rotateX(-90 * Math.PI / 180);
    this.scene.add(this.group)
    this.drawLevee()
    this.initLight()
    this.initCamera()
    this.initRenderer()
  }
  public render() {
    return (
      <div className={style['levee-threeD-warp']}>
        <canvas></canvas>
      </div>
    );
  }
}
