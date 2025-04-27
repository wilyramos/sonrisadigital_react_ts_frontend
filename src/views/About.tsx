import { motion } from "framer-motion";
import { FaRegSmileBeam, FaHandsHelping, FaMedal } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            ¿Quiénes somos?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-600 text-lg"
          >
            En <span className="text-teal-500 font-semibold">Sonrisa Digital</span> 
            nos apasiona transformar vidas a través de sonrisas saludables y felices.
            Contamos con un equipo de especialistas dedicados a tu bienestar dental.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Card 1 */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 text-center"
            variants={fadeInUp}
          >
            <FaRegSmileBeam className="text-teal-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Compromiso</h3>
            <p className="text-gray-600">
              Nos comprometemos a brindarte atención personalizada y resultados excepcionales.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 text-center"
            variants={fadeInUp}
          >
            <FaHandsHelping className="text-teal-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Confianza</h3>
            <p className="text-gray-600">
              Construimos relaciones basadas en la confianza, la empatía y el respeto.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8 text-center"
            variants={fadeInUp}
          >
            <FaMedal className="text-teal-500 text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Excelencia</h3>
            <p className="text-gray-600">
              Utilizamos tecnología de vanguardia y técnicas avanzadas para ofrecerte el mejor servicio.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
