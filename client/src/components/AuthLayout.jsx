function AuthLayout({ title, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <img
            className="h-16 w-16 rounded-full shadow-md"
            src="logo.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
