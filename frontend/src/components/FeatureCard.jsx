function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">

      <div className="w-14 h-14 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 mb-5">
        {icon}
      </div>

      <h2 className="text-xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="text-gray-600 mt-3 leading-7">
        {description}
      </p>

    </div>
  );
}

export default FeatureCard;