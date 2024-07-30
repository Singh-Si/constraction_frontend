import { ProgressSpinner } from "primereact/progressspinner";
import styled from "styled-components";

const PageLoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`;

const Loader = () => (
  <PageLoaderWrapper>
    {/* <div className="spinner-grow text-info" role="status">
      <span className="visually-hidden">Loading...</span>
    </div> */}
    <ProgressSpinner style={{ width: 50, height: 50 }} />

  </PageLoaderWrapper>
);

export default Loader;
