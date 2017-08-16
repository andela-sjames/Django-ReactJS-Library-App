export default function fadeIn(
  id: string,
  duration: number = 1000,
  targetOpacity: number = 1,
  framerate: number = 60
) {
  const element: HTMLElement = document.getElementById(id);
  const millisecondsPerFrame = Math.floor(1000 / framerate);

  let last = new Date().getTime();
  const tick = () => {
    element.style.opacity = (
      Number(element.style.opacity) +
      (new Date().getTime() - last) / duration
    ).toString();
    last = new Date().getTime();

    if (Number(element.style.opacity) < targetOpacity) {
      (
        window.requestAnimationFrame &&
        requestAnimationFrame(tick)
      ) || setTimeout(tick, millisecondsPerFrame);
    } else {
      element.style.opacity = targetOpacity.toString();
    }
  };

  tick();
}
