import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { services, stats } from '../constants';
import { FiCode, FiSmartphone, FiServer, FiPenTool } from 'react-icons/fi';

const ServiceCard = ({ index, title, icon, description }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'web':
        return <FiCode className="w-16 h-16 text-white" />;
      case 'mobile':
        return <FiSmartphone className="w-16 h-16 text-white" />;
      case 'backend':
        return <FiServer className="w-16 h-16 text-white" />;
      case 'creator':
        return <FiPenTool className="w-16 h-16 text-white" />;
      default:
        return <FiCode className="w-16 h-16 text-white" />;
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="glass xs:w-[250px] w-full p-6 rounded-2xl"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="w-20 h-20 rounded-full bg-gradient-to-r from-electric-cyan to-neon-purple flex justify-center items-center mb-5"
      >
        {getIcon(icon)}
      </motion.div>

      <h3 className="text-white text-[20px] font-bold">{title}</h3>
      <p className="mt-2 text-secondary text-[14px]">{description}</p>
    </motion.div>
  );
};

const StatCard = ({ title, value, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center justify-center p-6"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className="text-5xl font-bold text-white"
      >
        {inView ? (
          <CountUp end={value} duration={2} />
        ) : (
          <span>0</span>
        )}
        {title === "Years Experience" && "+"}
      </motion.h2>
      <p className="mt-2 text-secondary text-center">{title}</p>
    </motion.div>
  );
};

// Simple CountUp component
const CountUp = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      setCount(Math.floor(percentage * end));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <>{count}</>;
};

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="about" className="relative w-full h-auto mx-auto py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-electric-cyan text-lg font-medium mb-2">INTRODUCTION</p>
          <h2 className="text-white text-4xl sm:text-5xl font-bold">Hey, I’m Mayank Tarneja!</h2>
        </motion.div>

    
        <div className="flex flex-col md:flex-row items-center gap-10">
         
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/3 flex justify-center"
          >
            <img
              src="/manav.jpg" 
              alt="Mayank Tarneja"
              className="rounded-2xl w-full max-w-md h-22 object-cover shadow-lg"
            />
          </motion.div>

          {/* Introduction Text Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-2/3"
          >
            <p className="mt-4 text-secondary text-lg max-w-3xl mx-auto">
            Hi, I’m Mayank Tarneja, a tech enthusiast with a strong interest in Power BI, Data Analytics, Cybersecurity and Frontend Development. Currently pursuing my B.Tech in Computer Science and Engineering, I am on a mission to combine data-driven insights with security intelligence.

I have a solid foundation in Power BI and am actively expanding my expertise in cybersecurity, with a focus on security analytics. My goal is to land an internship or job in this field, contributing to real-world security and analytics solutions.

I am constantly exploring ways to enhance my skills through practical learning, projects, and industry-relevant certifications. My interests also extend to ethical hacking, threat intelligence, data visualization, cloud security, network security, penetration testing, and security analytics. Additionally, I have experience with Power BI, Advanced Excel, HTML, CSS, JavaScript, Tailwind CSS, C++, and SQL, which help me develop interactive and efficient solutions in both front-end development, business intelligence, and database management.

Beyond academics, I enjoy exploring new technologies, engaging in hands-on projects, and collaborating on innovative ideas. Let’s connect and discuss anything related to data, security, or tech trends!
            </p>
          </motion.div>
        </div>

        {/* Services Section */}
        <div className="mt-20 flex flex-wrap gap-10 justify-center">
          {services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} index={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;