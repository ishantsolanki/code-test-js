import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initialize } from './d3';
import { stopSimulation } from '../../actions/graphActions';

export const mapStateToProps = (state) => ({
  isSimulationOn: state?.graphState?.isSimulationOn
});

export const mapDispatchToProps = {
  stopSimulationBound: stopSimulation,
}

export const SimilarRestaurantsGraph = ({ isSimulationOn, stopSimulationBound }) => {
  const d3Ref = useRef(null);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    let spacebarListener;
    if (isSimulationOn) {
      spacebarListener = document.body.addEventListener('keypress', (event) => {
        if (event.keyCode === 32) {
          stopSimulationBound();
        }
      })
    }

    return () => document.body.removeEventListener('keypress', spacebarListener);
  }, [isSimulationOn, stopSimulationBound]);

  return (
    <>
    <div style={{border: '1px solid lightgray'}}>
      <svg ref={d3Ref} id='base-svg' width={1120} height={500} />
    </div>
    {isSimulationOn && (
      <div>
        <div style={{color: 'red'}}> Restaurants in the north</div>
        <div style={{color: '#4caf50'}}>Restaurants in the east</div>
        <div style={{color: 'blue'}}>Restaurants in the west</div>
        <div style={{color: '#ffc107'}}>Restaurants in the south</div>
        <div>Restaurant location not found</div>
      </div>
    )}
    </>
  );
};

SimilarRestaurantsGraph.propTypes = {
  isSimulationOn: PropTypes.bool,
  stopSimulationBound: PropTypes.func.isRequired,
}

SimilarRestaurantsGraph.defaultProps = {
  isSimulationOn: false,
}

export default connect(mapStateToProps, mapDispatchToProps)(SimilarRestaurantsGraph);
