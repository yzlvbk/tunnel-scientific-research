import * as React from 'react';
import * as THREE from 'three'
import { Lut } from './Lut';
import OrbitControls from 'three-orbitcontrols'
import style from './index.module.less'
// import frontView from './three-d-icon/frontView.png'
// import obliqueView from './three-d-icon/obliqueView.png'
// import sideView from './three-d-icon/sideView.png'
// import topView from './three-d-icon/topView.png'

var params = {
  colorMap: 'rainbow',
};
var lut = new Lut();
lut.setColorMap(params.colorMap);
// lut.setMax(5);
// lut.setMin(-10);

//  动态整合vertices
var vertices: any[] = []
for (let i = 0; i < 186; i++) {
  const distance = (i * 2 - 186) * 3.5
  vertices.push(new THREE.Vector3(distance, 0, -240))
  vertices.push(new THREE.Vector3(distance, 0, -40))
  vertices.push(new THREE.Vector3(distance, 85, -40))
  vertices.push(new THREE.Vector3(distance, 100, 0))
  vertices.push(new THREE.Vector3(distance, 121, 0))
  vertices.push(new THREE.Vector3(distance, 148, -87))
  vertices.push(new THREE.Vector3(distance, 159, -87))
  vertices.push(new THREE.Vector3(distance, 159, -240))
}

// 4个点生成2个三角形
const buildTriangle = (a: number, b: number, c: number, d: number) => {
  return [b, a, c, b, d, c]
}

// 相邻两组点计算索引
const buildAdjacentIndex = (arr1: number[], arr2: number[]) => {
  let indexArry: number[] = []
  for (let i = 0, x = (arr1.length - 1); i < x; i++) {
    const index = buildTriangle(arr1[i], arr1[i + 1], arr2[i], arr2[i + 1])
    indexArry = indexArry.concat(index)
  }
  return indexArry
}

// 计算索引 type=8为8个一组，    type=2为2个一组计算top face 
const computedIndex = (num: number, type = 8) => {
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
const accordIndexBuildFace = (indexArry: number[]) => {
  const faceArry = []
  for (let i = 0, x = indexArry.length; i < x; i += 3) {
    faceArry.push(new THREE.Face3(indexArry[i], indexArry[i + 1], indexArry[i + 2]))
  }
  return faceArry
}

// 绘制大堤顶部
const buildTopFaces = (vertices: any, group: any) => {
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
const buildRiverBase = (group: any) => {
  let geometry = new THREE.Geometry(); //声明一个空几何体对象

  var verticesArry: any = [
    vertices[1],
    vertices[2],
    vertices[vertices.length - 7],
    vertices[vertices.length - 6]
  ]
  //类型数组创建顶点位置position数据
  geometry.vertices = verticesArry

  const indexArry = computedIndex(verticesArry.length, 2)
  var faces = accordIndexBuildFace(indexArry)
  geometry.faces = faces

  geometry.computeFaceNormals()


  // geometry.rotateX(270 * Math.PI / 180);
  // geometry.translate(0, -1000, 0);

  // let color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
  //材质对象
  var material = new THREE.MeshPhongMaterial({
    color: 'blue', //三角面颜色
    opacity: 0.8,
    side: THREE.DoubleSide //两面可见
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  // scene.add(mesh); //网格模型添加到场景中
  group.add(mesh)
}

// 绘制侧面
const buildSide = (vertices: any, group: any) => {
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
const buildFront = (group: any) => {
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
const buildBack = (group: any) => {
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

interface ILeveeThreeDProps {
  leveeTimeTransformValue: any,
  zoom: number // 缩放值
}

interface ILeveeThreeDState {
  translateX: number
  translateY: number
  translateZ: number
  rotateX: number
  rotateY: number
  rotateZ: number
}
export default class LeveeThreeD extends React.Component<ILeveeThreeDProps, ILeveeThreeDState> {
  container: any
  warp: any
  containerWidth: any
  containerHeight: any
  scene: any
  group: any
  renderer: any
  camera: any
  controls: any
  mouseZoom: number = 1
  rotation: any // 上次旋转

  public state = {
    translateX: 80,
    translateY: 120,
    translateZ: 0,
    rotateX: -90,
    rotateY: 1,
    rotateZ: 90
  }

  public componentDidMount() {
    this.container = document.querySelector(`.${style['levee-threeD-warp']}`)
    this.warp = this.container?.getBoundingClientRect()
    this.containerWidth = this.warp!.right - this.warp!.left
    this.containerHeight = this.warp!.bottom - this.warp!.top
  }

  // 防止重复render
  public shouldComponentUpdate(nextProps: ILeveeThreeDProps, nextState: ILeveeThreeDState) {
    return this.props.leveeTimeTransformValue !== nextProps.leveeTimeTransformValue ||
      this.state !== nextState ||
      this.props.zoom !== nextProps.zoom
  }

  public componentDidUpdate() {
    lut.setMax(5);
    lut.setMin(-10);
    //  动态整合vertices
    vertices = []
    for (let i = 0; i < 186; i++) {
      const distance = (i * 2 - 186) * 3.5
      vertices.push(new THREE.Vector3(distance, 0, -240))
      vertices.push(new THREE.Vector3(distance, 0, -40))
      vertices.push(new THREE.Vector3(distance, 85, -40))
      vertices.push(new THREE.Vector3(distance, 100, 0))
      vertices.push(new THREE.Vector3(distance, 121, 0))
      vertices.push(new THREE.Vector3(distance, 148, -87))
      vertices.push(new THREE.Vector3(distance, 159, -87))
      vertices.push(new THREE.Vector3(distance, 159, -240))
    }

    const { leveeTimeTransformValue, zoom = 10 } = this.props

    for (let i = 0, x = Object.keys(leveeTimeTransformValue).length / 2; i < x; i += 0.5) {
      const index = i * 2
      const distance = (index * 2 - 186) * 3.5
      // 将沉降值缩放zoom倍
      const zoomItem = leveeTimeTransformValue[i] / zoom
      if (vertices[(index * 8 + 3)] && vertices[(index * 8 + 4)]) {
        vertices.splice((index * 8 + 3), 1, (new THREE.Vector3(distance, 100, zoomItem)))
        vertices.splice((index * 8 + 4), 1, (new THREE.Vector3(distance, 121, zoomItem)))
      }
    }

    if (this.scene || this.renderer) {
      this.scene.remove()
      this.renderer.dispose()
    }
    this.initThree()
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

  public drawTunnels = () => {
    //西线
    const pathWest = new THREE.CatmullRomCurve3([
      new THREE.Vector3(437.5, 0, -175),
      new THREE.Vector3(437.5, 159, -175),
    ])
    //东线
    const pathEast = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-437.5, 0, -175),
      new THREE.Vector3(-437.5, 159, -175),
    ])

    // path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
    const geometryWest = new THREE.TubeGeometry(pathWest, 40, 40, 25)
    const geometryEast = new THREE.TubeGeometry(pathEast, 40, 40, 25)

    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      side: THREE.DoubleSide //两面可见
    }) //材质对象

    var meshWest = new THREE.Mesh(geometryWest, material); //管道网格模型对象
    var meshEast = new THREE.Mesh(geometryEast, material); //管道网格模型对象
    this.group.add(meshWest)
    this.group.add(meshEast)
  }

  public initText = () => {
    /* 创建canvas并输入文字 */
    function createText(text: string) {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d")
      canvas.width = 250
      canvas.height = 250
      context!.scale(2, 2)
      // drawRect(context); // 绘制矩形
      /* 字体颜色 */
      context!.fillStyle = "rgba(0,0,0,1)"
      context!.font = "16px bold"
      /**文字 */
      context!.fillText(text, 50, 60)

      /* 填充颜色 */
      // context!.strokeStyle = "#0864ee"
      // context!.strokeRect(0, 0, 680, 670)
      // context!.fillStyle = "rgba(10,18,51,0.8)"
      // context!.fillRect(1, 1, 678, 668)
      return canvas
    }

    const createSprite = (textCanvas: any, x: number, y: number, z: number) => {
      var texture = new THREE.Texture(textCanvas) // 将canvas作为纹理
      texture.needsUpdate = true
      var spriteMaterial = new THREE.SpriteMaterial({ map: texture })
      var sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.set(150, 150, 150) //大小缩放
      sprite.position.set(x, y, z) //位置
      this.group.add(sprite)
    }
    const eastTextCanva = createText('东')
    createSprite(eastTextCanva, -640.5, 100, 5)

    const westTextCanva = createText('西')
    createSprite(westTextCanva, 630.5, 100, 5)
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

    // 辅助坐标系   老版本AxisHelper 新版本AxesHelper
    //   var axisHelper = new THREE.AxesHelper(1000)
    //   this.scene.add(axisHelper)
  }

  public initCamera = () => {
    const k = this.containerWidth / this.containerHeight
    const s = 200
    this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, -10000000, 10000000);

    this.camera.position.set(-100, 0, 0); //设置相机位置
    this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    // 设置缩放大小
    this.camera.zoom = this.mouseZoom

    this.camera.updateProjectionMatrix()
  }

  public initRenderer = () => {
    // @ts-ignore
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      // @ts-ignore
      canvas: this.container.querySelector('canvas')
    })
    this.renderer.setSize(this.containerWidth, this.containerHeight)
    // this.renderer.setClearColor(0xb9d3ff, 1)
    const render = () => {
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(render)
    }
    render()
    // @ts-ignore
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enabled = false
    // 取消添加OrbitControls时的边框线
    this.renderer.domElement.removeAttribute('tabindex')
  }

  public initThree = () => {
    const {
      translateX,
      translateY,
      translateZ,
      rotateX,
      rotateY,
      rotateZ
    } = this.state
    this.scene = new THREE.Scene()
    this.group = new THREE.Group()
    this.initLight()
    this.drawLevee()
    this.drawTunnels()
    this.initText()
    this.initCamera()
    this.group.translateX(translateX)
    this.group.translateY(translateY)
    this.group.translateZ(translateZ)
    this.group.rotateX(rotateX * Math.PI / 180)
    this.group.rotateY(rotateY * Math.PI / 180)
    this.group.rotateZ(rotateZ * Math.PI / 180)

    this.scene.add(this.group)
    this.initRenderer()


    // 监听鼠标滚动缩放事件
    this.container.querySelector('canvas').addEventListener('wheel', this.mouseWheelFuc(), false)
    this.container.querySelector('canvas').addEventListener('click', () => {
      this.controls.saveState()
      this.rotation = this.controls.object.rotation
      console.log('click', this.controls.object)

      // this.position0 = this.controls.object.position
      // this.zoom0 = this.controls.object.zoom
    }, false)


  }

  public changeView = (tx: number, ty: number, tz: number, rx: number, ry: number, rz: number) => {
    this.setState({
      translateX: tx,
      translateY: ty,
      translateZ: tz,
      rotateX: rx,
      rotateY: ry,
      rotateZ: rz
    }, () => {
      if (this.scene || this.renderer) {
        this.scene.remove()
        this.renderer.dispose()
      }
      this.initThree()
    })
  }

  public mouseWheelFuc = () => {
    let timer: any
    return () => {
      if (timer !== null) clearTimeout(timer)
      timer = setTimeout(() => {
        // 记录上次缩放比例
        this.mouseZoom = this.controls.object.zoom
        clearTimeout(timer)
      }, 500)
    }
  }

  public render() {
    console.log('3D render');

    return (
      <div className={style['levee-threeD-warp']}>
        {/* <section className={style['three-d-icon']}>
          <span className={style['three-d-icon-item']} onClick={() => this.changeView(80, 150, 0, -90, 0, 90)}><img src={frontView} alt='' /></span>
          <span className={style['three-d-icon-item']} onClick={() => this.changeView(-30, 120, 60, -90, 0, -45)}><img src={obliqueView} alt='' /></span>
          <span className={style['three-d-icon-item']} onClick={() => this.changeView(0, 150, 90, -90, 0, 0)}><img src={sideView} alt='' /></span>
          <span className={style['three-d-icon-item']} onClick={() => this.changeView(-150, 80, 0, -90, -90, 90)}><img src={topView} alt='' /></span>
        </section> */}

        <canvas></canvas>
      </div>
    );
  }
}
