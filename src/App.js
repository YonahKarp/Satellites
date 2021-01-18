import React, { Component } from 'react'
import { connect } from 'react-redux'
import './css/index.css'
import { Scene } from '@esri/react-arcgis'

import { setTle } from './actions'
import {sgp4, twoline2satrec} from 'satellite.js'
import renderer from './renderer'


var api = "http://localhost:5000/"

export class App extends Component {
	constructor(props) {
		super(props);

		this.handleMapLoad = this.handleMapLoad.bind(this);

		fetch(api)
			.then((res) => res.json())
			.then(json => {
				this.props.onTleFetched(json)
			}).catch((e) => {
				console.log("data failed")
			});
	}

	componentDidMount() {
		console.log("mounted")
		var satellites = this.buildSatRecs()
			// renderer = new Renderer(satellites);
	}

	render() {
		return (
			<div>
				<Scene
					style={{ width: '100vw', height: '100vh' }}
					mapProperties={{ basemap: 'satellite' }}
					viewProperties={{
						zoom: 2,
						environment: {
							starsEnabled: false,
							lighting: {
								date: new Date(),
								cameraTrackingEnabled: false,
								directShadowsEnabled: false
							}
						}
					}}
					onLoad={this.handleMapLoad}
					on
				>
				</Scene>
			</div>
		)
	}

	handleMapLoad(map, view) {
		console.log("map loaded")
		this.setState({ map, view });
	}

	buildSatRecs(){
		var satellites = [];

		for(var satInfo of this.props.tle){

			var satrec = null,
				line1 = satInfo.TLE_LINE1.replace(/\s+/g," "),
				line2 = satInfo.TLE_LINE2.replace(/\s+/g," ");

			try {
				satrec = twoline2satrec(line1, line2);
			}
			catch (err) {
				continue;
			}
			
			if (satrec === null || satrec === undefined) { continue; }
			satellites.push({
				id: Number(line1.substring(2, 7)),
				satrec: satrec,
				selected: false,
				highlighted: false,
				metadata: null
			});

		}

		console.log(satellites)
		return satellites;
	}

}

const mapStateToProps = (state) => ({
	tle: state.tle
})

const mapDispatchToProps = (dispatch) => {
	return {
		onTleFetched: (tle) => {
			dispatch(setTle(tle))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

