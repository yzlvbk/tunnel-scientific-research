import * as React from 'react'
import { Card } from 'antd'
import img1 from './images/img1.png'
import img2 from './images/img2.png'
import img3 from './images/img3.png'
import img4 from './images/img4.png'
import img5 from './images/img5.png'
import img6 from './images/img6.png'

export interface IProjectInfoProps {
}

export default class ProjectInfo extends React.Component<IProjectInfoProps> {
  public render() {
    return (
      <div>
        <Card title="工程概况" style={{ padding: '0 80px', fontSize: 16 }}>
          <section>
            <h3>一、监测目的</h3>
            <p>本项目通过在济南黄河隧道南岸大堤位置埋设沉降监测装置，监测隧道在到达南岸接收井前的沉降变化情况，为研究隧道和路面结构在外力荷载作用下的力学性能变化提供可靠数据。</p>
          </section>

          <section>
            <h3>二、监测选址</h3>
            <p>如下图所示，初期选取了红线位置1、2、3、4作为本次沉降监测的备选监测地点。但是考虑到选址1位于大堤人工监测点附近，方便后期对比，且此处便于施工机械操作，不会破坏道路绿化带，经过充分考量与对比，选址1更具备此次监测条件。</p>
            <div style={{ textAlign: 'center' }}><img src={img1} style={{ width: '100%', maxWidth: '500px', margin: '5px 0 15px' }} alt="选址示意图" /></div>
            <div style={{ textAlign: 'center', margin: '5px 0 15px' }}><span>图1 选址示意图</span></div>
          </section>

          <section>
            <p>如图2所示，选址1位于黄河水上世界门口空地处，在长90米，宽3米的绿化带中间需要放置7个沉降装置，放置位置大致如图所示，沉降装置距绿化带两边分别为1.2米和1.8米，沉降装置尽量安置在两棵树之间，确保不影响到绿化带植物和周围车辆停放。</p>
            <div style={{ textAlign: 'center' }}><img src={img2} style={{ width: '100%', maxWidth: '500px', margin: '15px auto 15px' }} alt="周边环境" /></div>
            <div style={{ textAlign: 'center' }}><span>图2 选址1周边环境</span></div>
            <div style={{ textAlign: 'center' }}><img src={img3} style={{ width: '100%', maxWidth: '500px', margin: '25px 0 15px' }} alt="沉降装置选址" /></div>
            <div style={{ textAlign: 'center' }}><span>图3 沉降装置选址</span></div>
          </section>

          <section>
            <p>如图3所示，7个沉降装置均匀的放置在90米长的绿化带中。考虑在图2红色标注位置处开槽放置监测装置，开槽尺寸为长2.5米，宽0.65米，深0.7米。具体开槽尺寸如下图4所示。</p>
            <div style={{ textAlign: 'center' }}><img src={img4} style={{ width: '100%', maxWidth: '500px', margin: '15px 0 15px' }} alt="正视图" /></div>
            <div style={{ textAlign: 'center' }}><span>正视图</span></div>
            <div style={{ textAlign: 'center' }}><img src={img5} style={{ width: '100%', maxWidth: '500px', margin: '25px 0 15px' }} alt="侧视剖切图" /></div>
            <div style={{ textAlign: 'center' }}><span>侧视剖切图</span></div>
            <div style={{ textAlign: 'center' }}><img src={img6} style={{ width: '100%', maxWidth: '500px', margin: '25px 0 15px' }} alt="沉降安装槽尺寸图" /></div>
            <div style={{ textAlign: 'center' }}><span>图4  沉降安装槽尺寸图</span></div>
          </section>

        </Card>
      </div>
    );
  }
}
