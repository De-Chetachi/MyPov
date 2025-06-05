import { User, Edit3, Heart, MessageCircle, Calendar, LogOut, Menu, X, Plus, Home, Info, Settings } from 'lucide-react';

export const AboutPage = () => {
    return(
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">About MyPov</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Empowering voices, sharing perspectives, and building connections through the power of written words.
            </p>
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
            {/* Mission Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                MyPov is more than just a blogging platform—it's a community where diverse voices come together to share their unique perspectives on life, technology, culture, and everything in between.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
                We believe that everyone has a story worth telling and a perspective worth sharing. Our platform provides the tools and space for writers to express themselves freely while connecting with readers who value authentic content.
            </p>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Edit3 size={20} className="text-purple-600" />
                    </div>
                    <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Writing</h3>
                    <p className="text-gray-600">
                        Intuitive editor with support for rich text, images, and multimedia content to bring your stories to life.
                    </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-purple-600" />
                    </div>
                    <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Profiles</h3>
                    <p className="text-gray-600">
                        Customize your profile, showcase your bio, and build your personal brand as a writer.
                    </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart size={20} className="text-purple-600" />
                    </div>
                    <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Engagement</h3>
                    <p className="text-gray-600">
                        Like, comment, and interact with other writers to build meaningful connections.
                    </p>
                    </div>
                </div>
                </div>

                <div className="space-y-6">
                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={20} className="text-purple-600" />
                    </div>
                    <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Comments</h3>
                    <p className="text-gray-600">
                        Foster discussions and engage with your readers through our comment system.
                    </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings size={20} className="text-purple-600" />
                    </div>
                    <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Powerful API</h3>
                    <p className="text-gray-600">
                        Built on a robust Node.js and MongoDB backend for reliable performance and scalability.
                    </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar size={20} className="text-purple-600" />
                    </div>
                    <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Management</h3>
                    <p className="text-gray-600">
                        Easily manage, edit, and organize your posts with our user-friendly dashboard.
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* Technology Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Built with Modern Technology</h2>
            <p className="text-lg text-gray-700 mb-6">
                MyPov is powered by cutting-edge technologies to ensure a fast, reliable, and scalable experience for all users.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">N</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Node.js</h3>
                <p className="text-gray-600 text-sm">
                    High-performance JavaScript runtime for fast server-side processing.
                </p>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">M</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">MongoDB</h3>
                <p className="text-gray-600 text-sm">
                    Flexible NoSQL database for efficient data storage and retrieval.
                </p>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">R</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">React</h3>
                <p className="text-gray-600 text-sm">
                    Modern frontend framework for interactive and responsive user interfaces.
                </p>
                </div>
            </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
            <p className="text-xl opacity-90 mb-6">
                Join our community of writers and start sharing your unique perspective with the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors">
                Get Started
                </button>
                <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-md hover:bg-white hover:text-purple-600 transition-colors">
                Learn More
                </button>
            </div>
            </div>
        </div>
        </div>
    
    );
}