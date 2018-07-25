import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Particles from 'react-particles-js';
import Dimensions from 'react-dimensions'


class Parts extends React.Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  };


    componentWillMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
      this.setState({height: window.innerHeight, width: window.innerWidth });
    };

  render() {
    const { height, width } = this.state;
    const isMobile = width <= 900;

    return (
    <Particles  params={parts}
              style={{
                zindex: -1,
                minHeight:height,
                minWidth:1.1*width,
                top:1,
                left:1,
                right:1,
                bottom:4,
                position:'fixed',
                background: 'linear-gradient(160deg, #ad0025  20%, #82001b  40%, #660e04  80%)',
              }}
            />
             );
  }
}

  Parts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (Parts);






const parts =
  {
    "particles": {
      "number": {
        "value": 40,
        "density": {
          "enable": true,
          "value_area": 1104.8088779284833
        }
      },

      "color": {
        "value": ["#ffe100", "#d0ff00", "#00ffdd", "#3f00ff", "#fff200", "#fff200"]
      },

      "shape": {
        "type": "edge",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 1.5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 63.13193588162762,
        "color": "#ffffff",
        "opacity": 0.7418002466091246,
        "width": 1.1048088779284833
      },
      "move": {
        "enable": true,
        "speed": 1.5782983970406905,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 133.99314807765512,
          "size": 6.181195279786829,
          "duration": 3.248318741276488,
          "opacity": 0.109489912447658927,
          "speed": 3
        },
        "repulse": {
          "distance": 199.8001998001998,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }


  /*
      <Particles  params={parts}
              style={{
                zindex: -100,
                width: '100% !important',
                height: '100% !important',
                background: 'linear-gradient(160deg, #ad0025  20%, #82001b  40%, #660e04  80%)',
                boxShadow: '0 3px 5px 2px rgba(247, 193, 0, 0.4)',
              }}
            />











  */
