"use client";
export default function CVPage() {
  return (
    <div className="flex justify-center items-center py-7 h-full">
      <img
        src="/cv/Davidfrancis_CV.png"
        alt="CV"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
