import hero from "../assets/hero.png";
const Hero = () => {
  return (
    <div>
      <img
        src={hero}
        className="w-full max-h-[600px] object-cover"
        alt=""
        srcSet={`${hero} 1200w, ${hero} 800w, ${hero} 400w`}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
};

export default Hero;
