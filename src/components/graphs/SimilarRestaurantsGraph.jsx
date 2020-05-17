import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { initialize } from './d3';

export const mapStateToProps = (state) => ({
  isSimulationOn: state?.graphState?.isSimulationOn
});


export const SimilarRestaurantsGraph = ({ isSimulationOn }) => {
  const d3Ref = useRef(null);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div>
      <svg ref={d3Ref} id='base-svg' width={500} height={500} />
    </div>
  );
};

export default connect(mapStateToProps)(SimilarRestaurantsGraph);
