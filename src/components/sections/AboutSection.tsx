import React from "react";

function AboutSection() {
  return (
    <section className="px-4 border-x full-line-bottom relative">
      <h2 className="text-3xl font-semibold relative full-line-bottom ">
        About
      </h2>
      <div className="flex flex-col gap-4 py-4 font-mono text-sm ">
        <p className="tracking-wide">
          Hi, I&apos;m Subrat, a passionate Java developer with expertise in building robust backend systems, microservices architecture, and enterprise applications. I love solving complex problems and sharing my knowledge with the developer community.
        </p>
        <p className="tracking-wide">
          I specialize in Java 17+, Spring Boot, Hibernate, and microservices. I have experience with REST APIs, Docker, Kubernetes, AWS, and CI/CD pipelines. I also work with React Js for full-stack development.
        </p>
        <p className="tracking-wide">
          Currently working as a Java Developer at IbaseIt Inc., where I develop backend systems using Finite State Machine (FSM) based frameworks to manage complex state transitions and workflow logic efficiently.
        </p>
        <p className="tracking-wide">
          With 1+ years of experience and 20+ projects completed, I&apos;m committed to delivering high-quality software solutions. Let&apos;s connect and build something amazing!
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
