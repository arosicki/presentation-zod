import $ from "./App.module.scss";
import useKeybind from "./lib/hooks/useKeybind";
import usePersistedState from "./lib/hooks/usePersistedState";
import clamp from "$lib/utils/clamp";

const slides = Object.entries<{ default: React.ComponentType }>(
  import.meta.glob("./slides/**/*.tsx", { eager: true })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map((i) => i[1].default);

export default function App() {
  const [slideIndex, setSlideIndex] = usePersistedState("slideIndex", 0);
  const CurrentSlide = slides.at(slideIndex);
  const navigateSlide = (add: number) => {
    setSlideIndex(clamp(0, slides.length - 1, slideIndex + add));
  };
  const nextSlide = () => navigateSlide(1);
  const prevSlide = () => navigateSlide(-1);

  useKeybind("a", prevSlide);
  useKeybind("d", nextSlide);
  useKeybind(" ", nextSlide);

  if (!CurrentSlide) return null;

  return (
    <div className={$.wrapper}>
      <div className={$.slide}>
        <CurrentSlide />
      </div>
    </div>
  );
}
