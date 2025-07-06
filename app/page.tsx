
'use client';
// import { m as motion } from 'framer-motion';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import ContactForm from '@/app/components/ContactForm';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const teamMembers = [
    {
      name: "Haseeb Shoukat",
      role: "Full Stack Architect",
      bio: "10+ years building scalable web applications with React, Node, and cloud infrastructure.",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    },
    {
      name: "Aman Shahzad",
      role: "AI/ML Lead",
      bio: "Machine learning specialist with expertise in NLP and computer vision applications.",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    },
    {
      name: "Asjid Ali",
      role: "Mobile Engineering Lead",
      bio: "Cross-platform mobile expert with 50+ published apps across iOS and Android.",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    },
    {
      name: "Amash Rizwan",
      role: "UX/UI Director",
      bio: "Design thinking advocate creating intuitive user experiences for complex systems.",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    },
  ];

  const services = [
    {
      title: "Enterprise Web Solutions",
      description: "Scalable web applications with Next.js, React, and microservices architecture.",
      icon: "💻"
    },
    {
      title: "AI Integration",
      description: "Custom machine learning models and AI-powered features for your products.",
      icon: "🧠"
    },
    {
      title: "Mobile Development",
      description: "High-performance cross-platform apps with React Native and Flutter.",
      icon: "📱"
    },
    {
      title: "Cloud & DevOps",
      description: "Secure cloud infrastructure and CI/CD pipelines for seamless deployments.",
      icon: "☁️"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that drive engagement and conversions.",
      icon: "🎨"
    },
    {
      title: "Technical Consulting",
      description: "Expert guidance on architecture, scaling, and technology strategy.",
      icon: "🔍"
    }
  ];

  const projects = [
    {
      title: "OmniChannel Retail Platform",
      description: "Unified commerce solution connecting online and in-store experiences.",
      tags: ["Next.js", "Node.js", "AWS", "Redis"],
      link: "#"
    },
    {
      title: "AI-Powered Analytics Suite",
      description: "Predictive analytics dashboard for enterprise business intelligence.",
      tags: ["Python", "TensorFlow", "React", "D3.js"],
      link: "#"
    },
    {
      title: "Healthcare Mobile App",
      description: "Secure patient portal with telemedicine capabilities.",
      tags: ["React Native", "HIPAA", "Firebase", "WebRTC"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 flex items-center"
            >
              <span className="text-xl font-bold text-blue-600">SynergiX Labs</span>
            </motion.div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#home" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Services</a>
                <a href="#work" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Work</a>
                <a href="#team" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Team</a>
                <a href="#contact" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-r from-blue-700 to-blue-900 text-white py-24 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/grid.svg')]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold mb-6">
              Innovate <span className="text-blue-300">Together</span> with SynergiX Labs
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              We build cutting-edge digital solutions that transform businesses through technology synergy.
            </motion.p>
            <motion.div variants={fadeIn} className="flex gap-4 justify-center">
              <a href="#contact" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300">
                Start Your Project
              </a>
              <a href="#work" className="border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-700 transition duration-300">
                View Our Work
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our <span className="text-blue-600">Expertise</span></h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We combine deep technical knowledge with creative problem-solving to deliver exceptional results.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition duration-300 border border-gray-100">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our <span className="text-blue-600">Team</span></h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A diverse team of passionate experts dedicated to delivering excellence.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                    {/* Placeholder for team member photo */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-4xl text-blue-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-center mb-4">{member.role}</p>
                  <p className="text-gray-600 text-center mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={member.social.linkedin} className="text-gray-500 hover:text-blue-600 transition">
                      <FiLinkedin size={20} />
                    </a>
                    <a href={member.social.github} className="text-gray-500 hover:text-blue-600 transition">
                      <FiGithub size={20} />
                    </a>
                    <a href={member.social.twitter} className="text-gray-500 hover:text-blue-600 transition">
                      <FiTwitter size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our <span className="text-blue-600">Work</span></h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Selected projects that demonstrate our technical capabilities and creative approach.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                    <span className="text-white text-2xl font-medium">{project.title.split(' ')[0]}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href={project.link} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                      View Case Study
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's <span className="text-blue-400">Connect</span></h2>
              <p className="text-gray-300 mb-8 max-w-lg">
                Ready to discuss your project or learn more about how we can help your business? Reach out to our team—we'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FiMail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium">Email Us</h3>
                    <p className="text-gray-400">hello@synergixlabs.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium">Call Us</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium">Visit Us</h3>
                    <p className="text-gray-400">
                      123 Tech Park Drive<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <FiTwitter size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <FiLinkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <FiGithub size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-white">SynergiX Labs</span>
              <p className="text-gray-400 text-sm mt-1">Innovating through technology synergy</p>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} SynergiX Labs. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}