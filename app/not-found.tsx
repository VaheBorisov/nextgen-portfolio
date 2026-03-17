import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="bg-card border rounded-lg p-8 max-w-md w-full text-center space-y-4">
        <h2 className="text-4xl font-bold text-foreground">404</h2>
        <h3 className="text-xl font-semibold text-foreground">Page Not Found</h3>
        <p className="text-muted-foreground text-sm">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
