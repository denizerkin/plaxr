import { Mail, MessageSquare, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-slate-800 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:text-center mb-16">
                    <h2 className="text-base text-cyan-400 font-semibold tracking-wide uppercase">Get in Touch</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Ready to transform your training?
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-slate-400 lg:mx-auto">
                        Contact us to schedule a demo or discuss how PlaXR can help your organization.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-8 bg-gradient-to-br from-cyan-600 to-purple-600 text-white flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                                <p className="text-cyan-100 mb-8">
                                    Fill out the form or send us an email directly. We'll get back to you within 24 hours.
                                </p>


                            </div>

                            <div className="mt-12">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Send className="h-8 w-8 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-400">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="mt-1 block w-full bg-slate-800 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                        placeholder="Your Name"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-400">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="mt-1 block w-full bg-slate-800 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                        placeholder="you@example.com"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-400">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        className="mt-1 block w-full bg-slate-800 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                        placeholder="How can we help you?"
                                        readOnly
                                    ></textarea>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors cursor-default"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
