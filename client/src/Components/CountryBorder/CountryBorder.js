import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider/lib/Slider';
import ScratchCard from 'react-scratchcard';

import { getBoundingBox } from '../../utils';
import { colorPalette } from '../Map/countryStyles.js';
import themeColors from '../themeColors.js';

import './CountryBorder.css';
import 'rc-slider/assets/index.css';
import travellingImg from '../../scratchcard.jpg';

const canvasWidth = 300;
const canvasHeight = 150;

const draw = (context, canvasWidth, canvasHeight, bounds, geometry, color) => {
  context.fillStyle = color || '#333333';

  // determine the scale
  const xScale = canvasWidth / Math.abs(bounds.xMax - bounds.xMin);
  const yScale = canvasHeight / Math.abs(bounds.yMax - bounds.yMin);
  const scale = xScale < yScale ? xScale : yScale;

  // Handles countries made up of a single connected polygon
  if (geometry.type === 'Polygon') {
    const coordinates = geometry.coordinates[0];
    coordinates
      .map(point => [
        (point[0] - bounds.xMin) * scale,
        (bounds.yMax - point[1]) * scale
      ])
      .forEach((point, index) => {
        if (index === 0) {
          context.beginPath();
          context.moveTo(point[0], point[1]);
        } else {
          context.lineTo(point[0], point[1]);
        }
      });
    context.closePath();
    context.fill();
  }
  // Handles countries made up of multiple unconnected polygons
  else if (geometry.type === 'MultiPolygon') {
    //multiPolygonBoundingBox(geometry.coordinates);
    const shape = geometry.coordinates;
    shape.forEach(polygon => {
      const coordinates = polygon[0];
      coordinates
        .map(point => [
          (point[0] - bounds.xMin) * scale,
          (bounds.yMax - point[1]) * scale
        ])
        .forEach((point, index) => {
          if (index === 0) {
            context.beginPath();
            context.moveTo(point[0], point[1]);
          } else {
            context.lineTo(point[0], point[1]);
          }
        });
      context.closePath();
      context.fill();
    });
  }
};

export default class CountryBorder extends Component {
  state = {
    marks: {
      0: {
        style: {
          color: themeColors.fontColor[this.props.currentTheme],
          fontWeight: 'bold'
        },
        label: 'None'
      },
      1: {
        style: {
          color: themeColors.fontColor[this.props.currentTheme],
          fontWeight: 'bold'
        },
        label: 'Wishlist'
      },
      2: {
        style: {
          color: themeColors.fontColor[this.props.currentTheme],
          fontWeight: 'bold'
        },
        label: 'Transited'
      },
      3: {
        style: {
          color: themeColors.fontColor[this.props.currentTheme],
          fontWeight: 'bold'
        },
        label: 'Visited'
      },
      4: {
        style: {
          color: themeColors.fontColor[this.props.currentTheme],
          fontWeight: 'bold'
        },
        label: 'Lived'
      }
    }
  };

  componentDidMount() {
    this.drawBorder();
  }

  componentDidUpdate() {
    this.drawBorder();
  }

  drawBorder = () => {
    // Get the correct fill color based on status.
    // Check if this.props.currentCountryStatus exists to prevent any crashes
    const color = this.props.currentCountryStatus
      ? colorPalette[this.props.currentCountryStatus]
      : '#333333';
    const canvas = this.refs.canvas; // TODO: Fix deprecation warning
    const context = canvas.getContext('2d');
    if (context) context.clearRect(0, 0, canvasWidth, canvasHeight);
    // only draw if we have the geometry
    if (this.props.geometry) {
      draw(
        context,
        canvasWidth,
        canvasHeight,
        getBoundingBox(this.props.geometry),
        this.props.geometry,
        color
      );
    }
  };

  render() {
    const scratchcardSettings = {
      width: canvasWidth,
      height: canvasHeight,
      image: travellingImg,
      finishPercent: 98
    };

    if (this.props.preferences)
      scratchcardSettings.finishPercent = this.props.preferences.autoscratch
        ? 1
        : 98;

    return (
      <div className="CountryBorder">
        {this.props.scratched ? (
          <React.Fragment>
            <canvas
              ref="canvas"
              className="CountryBorder__Canvas"
              width={canvasWidth}
              height={canvasHeight}
            />
          </React.Fragment>
        ) : (
          <ScratchCard
            className="CountryBorder__Canvas"
            {...scratchcardSettings}
            onComplete={this.props.handleScratched}
          >
            <canvas
              ref="canvas"
              className="CountryBorder__Border"
              width={canvasWidth}
              height={canvasHeight}
            />
          </ScratchCard>
        )}
        {this.props.scratched && (
          <div className="CountryBorder__SliderContainer">
            <Slider
              className="Slider"
              min={0}
              max={4}
              marks={this.state.marks}
              step={null}
              onChange={this.props.handleSliderMove}
              defaultValue={0}
              value={this.props.currentCountryStatus}
              disabled={!this.props.scratched}
            />
          </div>
        )}
      </div>
    );
  }
}

CountryBorder.propTypes = {
  geometry: PropTypes.object,
  closeCountryPanel: PropTypes.func,
  handleSliderMove: PropTypes.func,
  handleScratched: PropTypes.func,
  currentCountryStatus: PropTypes.any,
  scratched: PropTypes.bool,
  preferences: PropTypes.object,
  currentTheme: PropTypes.string
};
