import "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FoodSlider.css"; // Ensure this contains necessary styles
import styled from 'styled-components';

// Card Component (Image Slider)
const Card = () => {
  return (
    <StyledWrapper>
      <div className="slider" style={{ '--width': '200px', '--height': '200px', '--quantity': 9 }}>
        <div className="list">
          <div className="item" style={{ '--position': 1 }}>
            <img src="src/assets/img50.jpg" alt="Image 1" />
          </div>
          <div className="item" style={{ '--position': 2 }}>
            <img src="src/assets/img45.jpg" alt="Image 2" />
          </div>
          <div className="item" style={{ '--position': 3 }}>
            <img src="src/assets/img43.jpg" alt="Image 3" />
          </div>
          <div className="item" style={{ '--position': 4 }}>
            <img src="src/assets/img41.jpg" alt="Image 4" />
          </div>
          <div className="item" style={{ '--position': 5 }}>
            <img src="src/assets/img40.jpg" alt="Image 5" />
          </div>
          <div className="item" style={{ '--position': 6 }}>
            <img src="src/assets/img21.jpg" alt="Image 6" />
          </div>
          <div className="item" style={{ '--position': 7 }}>
            <img src="src/assets/img10.jpg" alt="Image 7" />
          </div>
          <div className="item" style={{ '--position': 8 }}>
            <img src="src/assets/img7.jpg" alt="Image 8" />
          </div>
          <div className="item" style={{ '--position': 9 }}>
            <img src="src/assets/img3.jpg" alt="Image 9" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .slider {
    width: 100%;
    height: var(--height);
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent, #000 10% 90%, transparent);
  }

  .slider .list {
    display: flex;
    width: 100%;
    min-width: calc(var(--width) * var(--quantity));
    position: relative;
    transition: all 0.5s ease;
  }

  .slider .list .item {
    width: var(--width);
    height: var(--height);
    position: absolute;
    left: 100%;
    animation: autoRun 12s linear infinite;
    transition: filter 0.5s;
    animation-delay: calc((12s / var(--quantity)) * (var(--position) - 1) - 12s);
  }

  .slider .list .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes autoRun {
    from {
      left: 100%;
    }
    to {
      left: calc(var(--width) * -1);
    }
  }

  .slider:hover .item {
    animation-play-state: paused !important;
    filter: grayscale(1);
  }

  .slider .item:hover {
    filter: grayscale(0);
  }

  .slider[reverse="true"] .item {
    animation: reversePlay 12s linear infinite;
  }

  @keyframes reversePlay {
    from {
      left: calc(var(--width) * -1);
    }
    to {
      left: 100%;
    }
  }

  /* Make sure to adjust these for better responsiveness */
  @media (max-width: 768px) {
    .slider {
      height: 150px; /* Adjust height for smaller screens */
    }

    .slider .list .item {
      width: 150px; /* Adjust width for smaller screens */
      height: 150px; /* Adjust height for smaller screens */
    }
  }

  @media (max-width: 480px) {
    .slider {
      height: 120px; /* Adjust height for smaller screens */
    }

    .slider .list .item {
      width: 120px; /* Adjust width for smaller screens */
      height: 120px; /* Adjust height for smaller screens */
    }
  }
`;

// Main component without navigation bar
function FoodSlider() {
  return (
    <Container>
      <Card />
    </Container>
  );
}

export default FoodSlider;