import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiX, FiMessageSquare, FiRotateCcw, FiCheck } from 'react-icons/fi';

const formStructure = [
  {
    key: 'firstName',
    question: 'Let\'s start with your first name:',
    type: 'text',
    placeholder: 'John'
  },
  {
    key: 'lastName',
    question: 'And your last name:',
    type: 'text',
    placeholder: 'Doe'
  },
  {
    key: 'email',
    question: 'What\'s your email address?',
    type: 'email',
    placeholder: 'john.doe@example.com'
  },
  {
    key: 'phone',
    question: 'Please share your phone number:',
    type: 'tel',
    placeholder: '(123) 456-7890'
  },
  {
    key: 'problemType',
    question: 'What type of issue are you experiencing?',
    type: 'multiple-choice',
    options: ['New Order', 'Delivery', 'Billing', 'Other']
  },
  {
    key: 'description',
    question: 'Please describe your issue in detail:',
    type: 'textarea',
    placeholder: 'Type your message here...'
  },
  {
    key: 'urgency',
    question: 'How urgent is this matter?',
    type: 'multiple-choice',
    options: ['Today', 'Next 48 hours', 'This week', 'Not urgent']
  }
];

function ChatAboutUs() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (chatVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatVisible, currentStep]);

  const startChat = () => {
    setChatVisible(true);
    setMessages([{
      text: '👋 Hello! I\'ll help you fill out the support form. Let\'s start with your first name:',
      sender: 'bot'
    }]);
    setCurrentStep(0);
    setFormData({});
    setInputValue('');
  };

  const handleResponse = (value) => {
    if (!value) return;

    const currentField = formStructure[currentStep];
    
    if (currentField.type === 'multiple-choice' && !currentField.options[value]) {
      setMessages(prev => [...prev, {
        text: '⚠️ Please select a valid option',
        sender: 'bot'
      }]);
      return;
    }

    const answer = currentField.type === 'multiple-choice' 
      ? currentField.options[value] 
      : value;

    setFormData(prev => ({ ...prev, [currentField.key]: answer }));
    setMessages(prev => [...prev, { text: answer, sender: 'user' }]);
    setInputValue('');

    if (currentStep < formStructure.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setMessages(prev => [...prev, { 
          text: formStructure[currentStep + 1].question,
          sender: 'bot' 
        }]);
      }, 500);
    } else {
      setCurrentStep(formStructure.length);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: '✅ All done! Ready to review your form?',
          sender: 'bot' 
        }]);
      }, 500);
    }
  };

  const handleSubmit = () => {
    const message = `📋 *New Support Request* 📋
    
*Personal Information:*
👤 Name: ${formData.firstName} ${formData.lastName}
📧 Email: ${formData.email || 'N/A'}
📞 Phone: ${formData.phone || 'N/A'}

*Issue Details:*
🔧 Issue Type: ${formData.problemType}
📝 Description: ${formData.description}
⏰ Urgency: ${formData.urgency}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({});
    setCurrentStep(0);
    setMessages([]);
    setChatVisible(false);
    setInputValue('');
  };

  const renderInputField = () => {
    const currentField = formStructure[currentStep];
    
    if (currentField.type === 'multiple-choice') {
      return (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {currentField.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleResponse(index)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
            >
              {option}
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 mt-2">
        <input
          ref={inputRef}
          type={currentField.type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={currentField.placeholder}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && inputValue.trim()) {
              handleResponse(inputValue);
            }
          }}
          className="flex-1 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={() => inputValue.trim() && handleResponse(inputValue)}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          <FiSend />
        </button>
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button */}
      {!chatVisible && (
        <button 
          onClick={startChat}
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110"
        >
          <FiMessageSquare className="text-xl" />
        </button>
      )}

      {/* Chat Container */}
      {chatVisible && (
        <div className="w-80 h-[32rem] bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-white/20 flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white flex justify-between items-center">
            <h3 className="font-medium">Support Assistant</h3>
            <button
              onClick={() => setChatVisible(false)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <FiX />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-xs mb-3 p-3 rounded-lg ${msg.sender === 'user' 
                  ? 'ml-auto bg-green-500 text-white rounded-br-none' 
                  : 'mr-auto bg-gray-100 text-gray-800 rounded-bl-none'}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            {currentStep < formStructure.length ? (
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {formStructure[currentStep].question}
                </p>
                {renderInputField()}
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowForm(true)}
                  className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <FiCheck /> Review
                </button>
                <button
                  onClick={startChat}
                  className="flex-1 flex items-center justify-center gap-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  <FiRotateCcw /> Restart
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Form Preview Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
              <h3 className="font-medium">Support Request Summary</h3>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-500">PERSONAL INFORMATION</h4>
                <div className="space-y-1">
                  <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                  <p><span className="font-medium">Email:</span> {formData.email || 'N/A'}</p>
                  <p><span className="font-medium">Phone:</span> {formData.phone || 'N/A'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-500">ISSUE DETAILS</h4>
                <div className="space-y-1">
                  <p><span className="font-medium">Issue Type:</span> {formData.problemType}</p>
                  <p><span className="font-medium">Description:</span> {formData.description}</p>
                  <p><span className="font-medium">Urgency:</span> {formData.urgency}</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => setShowForm(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                Close
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Submit via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatAboutUs;