/* 3d-Marquee/js/script.js for 3d-Marquee.bauska.org */
import GUI from "https://esm.sh/lil-gui";

  const rotatedStage = document.getElementById('marqueeRotatedStage');
  const track = document.getElementById('marqueeTrack');
  const marqueeWorld = document.getElementById('marqueeWorld');
  const marqueeContainer = document.getElementById('marqueeContainer');
    
  let currentDirection = 'rightToLeft'; 
    
  const settings = {
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    speed: 25,
    reset: () => {
      settings.rotateY = 0;
      settings.rotateZ = 0;
      updateRotation();
      updateMargins();
      speedControl.setValue(25);
            
      rotateYControl.setValue(0);
      rotateZControl.setValue(0);
    }
  };
  function toggleDirection() {
  track.classList.toggle('reverse');
}

function updateMargins() {
  if (!marqueeWorld) return;
        
  const angle = settings.rotateY;
  const factor = Math.abs(angle) / 45; 
  const extraOffset = factor * -30; 
        
  if (angle > 0) {
    const leftOffset = -10 - extraOffset;
    const rightOffset = -10 + extraOffset;
    marqueeWorld.style.margin = `0 ${rightOffset}% 0 ${leftOffset}%`;
  } else if (angle < 0) {
    const leftOffset = -10 + extraOffset;
    const rightOffset = -10 - extraOffset;
    marqueeWorld.style.margin = `0 ${rightOffset}% 0 ${leftOffset}%`;
  } else {
    marqueeWorld.style.margin = '0 -10%';
  }
}
    
function updateRotation() {
  if (rotatedStage) {
    rotatedStage.style.transform = `rotateX(${settings.rotateX}deg) rotateY(${settings.rotateY}deg) rotateZ(${settings.rotateZ}deg)`;
  }
  updateMargins();
}
    
function updateSpeed(value) {
  if (track) {
    track.style.animationDuration = `${value}s`;
  }
}
    
if (marqueeContainer) {
  marqueeContainer.addEventListener('dblclick', function(e) {
    e.stopPropagation(); 
    toggleDirection();
            
    marqueeContainer.style.transform = 'scale(1.02)';
    setTimeout(() => {
      marqueeContainer.style.transform = 'scale(1)';
    }, 200);
  });
        
  marqueeContainer.style.transition = 'transform 0.2s ease';
}

const gui = new GUI({ title: 'Controls', width: 280 });

const rotateYControl = gui.add(settings, 'rotateY', -45, 45, 1)
.name('Rotation Y')
.onChange(updateRotation);
    
const rotateZControl = gui.add(settings, 'rotateZ', -30, 30, 1)
.name('Rotation Z')
.onChange(updateRotation);
    
const speedControl = gui.add(settings, 'speed', 8, 60, 0.5)
.name('Speed')
.onChange(updateSpeed);
    
gui.add(settings, 'reset').name('⟳ Reset');
    
updateRotation();
updateSpeed(settings.speed);
