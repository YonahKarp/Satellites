import React, { Component } from 'react'
import { connect } from 'react-redux'
import './css/index.css'
import {Scene} from '@esri/react-arcgis'

export class App extends Component {


  render() {
    return (
      <div>
          <Scene
            style={{width: '100vw', height: '100vh'}}
            mapProperties={{basemap: 'satellite'}}
            viewProperties={{
              zoom: 2,
              environment: {
                starsEnabled: false,
                lighting:{
                  date: new Date(),
                  cameraTrackingEnabled: false,
                  directShadowsEnabled: false
                }
              }
            }}
            >
          </Scene>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

