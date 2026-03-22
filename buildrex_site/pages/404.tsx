// pages/404.tsx
import Link from 'next/link';
import { FC } from 'react';
import Layout from '../components/Layout';
import { createWebPageSchema } from '../common/seoConfig';

const Custom404: FC = () => {
    const description = "The page you were looking for could not be found on Buildrex Construction.";

    return (
        <Layout
            title="404 | Buildrex Construction"
            description={description}
            noindex
            structuredData={createWebPageSchema({
                path: "/404",
                name: "404 Page",
                description,
            })}
        >
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-lg mb-6">Oops! The page you are looking for doesn't exist.</p>
                <Link
                    href="/"
                    className="px-6 py-3 text-black font-medium rounded-md hover:bg-white transition-colors duration-200 shadow-md"
                >
                    Go back to the homepage
                </Link>
            </div>
        </Layout>
    );
};

export default Custom404;