import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { initialize } from './d3';
import { stopSimulation } from '../../actions/graphActions';

export const mapStateToProps = (state) => ({
  isSimulationOn: state?.graphState?.isSimulationOn
});

export const mapDispatchToProps = {
  stopSimulationBound: stopSimulation,
};

export const SimilarRestaurantsGraph = ({
  isSimulationOn,
  stopSimulationBound,
}) => {
  const d3Ref = useRef(null);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    let spacebarListener;
    if (isSimulationOn) {
      spacebarListener = document.body.addEventListener('keypress', (event) => {
        event.keyCode === 32 && stopSimulationBound();
      });
    }
    return () => document.body.removeEventListener('keypress', spacebarListener);
  }, [isSimulationOn, stopSimulationBound]);

  return (
    <div>
      <svg ref={d3Ref} id='base-svg' width={500} height={500} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SimilarRestaurantsGraph);
