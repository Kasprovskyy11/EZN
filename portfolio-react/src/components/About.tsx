import React, { useState, useEffect } from "react";
import ProggramerIllustration from "../assets/ProgrammerIllustration.svg";

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkVisibility = () => {
    const element = document.getElementById("aboutme");
    if (element) {
      const rect = element.getBoundingClientRect();
      setIsVisible(rect.top <= window.innerHeight && rect.bottom >= 0);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <img src={ProggramerIllustration} alt="Programmer Illustration" />

      <div
        id="aboutme"
        className={`mx-auto flex flex-col mt-20 text-[#d4d4dc] transition-transform duration-700 ease-out ${
          isVisible ? "transform translate-y-0" : "transform translate-y-full"
        }`}
      >
        <h2 className="text-4xl text-center font-bold uppercase">About Me</h2>
        <p className="text-center mt-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit aut
          consequuntur repellat, consequatur maiores et illo quidem voluptatem
          quam nostrum vero necessitatibus ducimus quas culpa ab quisquam earum
          dolorem sapiente, neque explicabo. Reprehenderit quia, porro deserunt
          magnam, a consectetur saepe tenetur cumque illum numquam, assumenda
          necessitatibus. Quas quam veniam nobis dolores. Assumenda sed hic
          laudantium quod accusantium nisi illum labore unde voluptatum, ut, ad
          nemo doloremque aperiam deserunt perspiciatis minus cupiditate sint
          sequi exercitationem obcaecati sunt. Earum neque rem laboriosam
          aspernatur architecto? Qui vitae, fugiat velit nam ducimus officia
          tempora est accusamus nihil eveniet impedit corporis iusto sequi
          reprehenderit nulla?
        </p>
      </div>
    </div>
  );
};

export default About;
