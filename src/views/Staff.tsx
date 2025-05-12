export default function Staff() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <img
        src="path/to/image.jpg"
        alt="Dr John Doe"
        className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
      />
      <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
        Dr. John Doe
      </h3>
      <p className="text-gray-600 text-center mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.
      </p>
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          Especialidad
        </h4>
        <p className="text-gray-600 mb-1">
          Médico especialista
        </p>
        <p className="text-gray-600">
          10 años de experiencia
        </p>
      </div>
    </div>
  );
}