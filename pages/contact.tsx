import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to submit the form. Please try again.');
        return;
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <Layout
      title="Contact Us"
      description="Get in touch with us. We're here to help and would love to hear from you."
    >
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container-max">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We&apos;d love to hear from you. Get in touch with us today.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="text-3xl">📞</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Phone</h3>
                    <p className="text-gray-700 mb-1">+1 (555) 123-4567</p>
                    <p className="text-gray-500 text-sm">Available 24/7</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="text-3xl">✉️</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Email</h3>
                    <p className="text-gray-700 mb-1">
                      <a href="mailto:info@luxuryhotel.com" className="text-primary-600 hover:underline">
                        info@luxuryhotel.com
                      </a>
                    </p>
                    <p className="text-gray-500 text-sm">We reply within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="text-3xl">📍</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Address</h3>
                    <p className="text-gray-700">123 Main Street</p>
                    <p className="text-gray-700">City, State 12345</p>
                    <p className="text-gray-700">United States</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4">
                  <div className="text-3xl">🕐</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Hours</h3>
                    <p className="text-gray-700 mb-1">Monday - Sunday: 24/7</p>
                    <p className="text-gray-500 text-sm">Reception always open</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                {status === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-semibold">✓ Message sent successfully!</p>
                    <p className="text-green-700 text-sm mt-1">
                      Thank you for contacting us. We&apos;ll get back to you soon.
                    </p>
                  </div>
                )}

                {status === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-semibold">✗ Error</p>
                    <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                      placeholder="Your phone number"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Room Reservation</option>
                      <option value="event">Event Booking</option>
                      <option value="feedback">Feedback</option>
                      <option value="support">Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${
                      status === 'loading'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700'
                    }`}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="container-max">
          <h2 className="text-4xl font-bold mb-8 text-center">Find Us</h2>
          <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              title="Hotel Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.00601!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ0LjQiTiA3NMK0MDAnMTIuMSJX!5e0!3m2!1sen!2sus!4v1234567890"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
}
