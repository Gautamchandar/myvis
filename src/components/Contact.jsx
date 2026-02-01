import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

function Contact({ isDarkMode, toggleMode }) {
  const form = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setErrorMessage('Please fill out all fields correctly.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    const serviceId = 'service_icch4t2'; 
    const templateId = 'template_tvgeb1o';
    const publicKey = 'PtbKZs0vVrTVkDHrg';

    try {
      if (serviceId.includes('YOUR_')) {
        throw new Error('Missing EmailJS Credentials');
      }

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: name,
            from_email: email,
            message: message,
          },
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to send');
      }
    } catch (error) {
      console.error('FAILED...', error.message);
      setErrorMessage(error.message === 'Missing EmailJS Credentials' 
        ? 'API keys not configured.' 
        : 'Transmission failed. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 font-sans transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-12"
      >
        {/* Header Section */}
        <header className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold tracking-tight"
          >
            Cᴏɴᴛᴀᴄᴛ Mᴇ
          </motion.h1>
          <div className="relative h-px w-full bg-cyan-900/30">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "circOut" }}
              className="absolute h-full bg-cyan-400"
            >
              <motion.div
                animate={{
                  opacity: [0.4, 1, 0.4],
                  boxShadow: ["0 0 10px #22d3ee", "0 0 20px #22d3ee", "0 0 10px #22d3ee"]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute left-0 -top-1 h-3 w-16 bg-cyan-400"
                style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
              />
            </motion.div>
          </div>
        </header>

        {/* Contact Form */}
        <form onSubmit={sendEmail} ref={form} className="space-y-10">
          <div className="group relative">
            <motion.label
              initial={{ opacity: 0.6 }}
              whileFocus={{ opacity: 1 }}
              className={`block text-sm font-medium mb-2 group-focus-within:text-cyan-400 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Full name
            </motion.label>
            <input
              type="text"
              name="from_name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Full Name"
              className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-cyan-400 transition-all duration-300 placeholder-gray-700 text-lg ${isDarkMode ? 'text-white border-gray-800' : 'text-black border-gray-300'}`}
            />
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 w-0 group-focus-within:w-full transition-all duration-500"
            />
          </div>

          {/* Email Field */}
          <div className="group relative">
            <motion.label
              initial={{ opacity: 0.6 }}
              whileFocus={{ opacity: 1 }}
              className={`block text-sm font-medium mb-2 group-focus-within:text-cyan-400 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Your email
            </motion.label>
            <input
              type="email"
              name="from_email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
              className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-cyan-400 transition-all duration-300 placeholder-gray-700 text-lg ${isDarkMode ? 'text-white border-gray-800' : 'text-black border-gray-300'}`}
            />
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 w-0 group-focus-within:w-full transition-all duration-500"
            />
          </div>

          {/* Message Field */}
          <div className="group relative">
            <motion.label
              className={`block text-sm font-medium mb-2 group-focus-within:text-cyan-400 transition-colors ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Message
            </motion.label>
            <textarea
              rows="3"
              name="message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What's on your mind?"
              className={`w-full bg-transparent border-b py-3 focus:outline-none focus:border-cyan-400 transition-all duration-300 placeholder-gray-700 text-lg resize-none ${isDarkMode ? 'text-white border-gray-800' : 'text-black border-gray-300'}`}
            />
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-cyan-400 w-0 group-focus-within:w-full transition-all duration-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              disabled={status === 'sending' || status === 'success'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`relative overflow-hidden group px-8 py-4 font-bold flex items-center justify-center min-w-50 transition-all border-2 
                ${isDarkMode 
                  ? 'border-white text-white bg-black hover:bg-white hover:text-black' 
                  : 'border-black text-black bg-white hover:bg-black hover:text-white'}
                ${status === 'success' ? 'border-green-500 text-green-500 hover:bg-transparent hover:text-green-500' : ''}
              `}
            >
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center space-x-3"
                  >
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span>Send message</span>
                  </motion.div>
                )}
                {status === 'sending' && (
                  <motion.div
                    key="sending"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`w-5 h-5 border-2 rounded-full animate-spin ${isDarkMode ? 'border-white border-t-transparent' : 'border-black border-t-transparent'}`} />
                    <span>Transmitting...</span>
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-3 text-green-500"
                  >
                    <CheckCircle size={20} />
                    <span>Message Received</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Error Message */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-red-400 text-sm flex items-center gap-2"
                >
                  <AlertCircle size={14} /> {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Contact;