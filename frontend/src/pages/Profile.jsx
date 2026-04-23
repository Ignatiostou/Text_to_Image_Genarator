import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, credit, backendUrl, token, logout } = useContext(AppContext);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user's generated images
      const imagesRes = await axios.get(backendUrl + '/api/user/images', {
        headers: { token }
      });
      
      // Fetch user's transaction history
      const transactionsRes = await axios.get(backendUrl + '/api/user/transactions', {
        headers: { token }
      });

      if (imagesRes.data.success) {
        setGeneratedImages(imagesRes.data.images || []);
      }
      
      if (transactionsRes.data.success) {
        setTransactions(transactionsRes.data.transactions || []);
      }
      
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load profile data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="dark:text-white">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] py-10"
    >
      {/* User Info Card */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <img 
              src={assets.profile_icon} 
              alt="Profile" 
              className="w-20 h-20 rounded-full border-4 border-blue-500"
            />
            <div>
              <h1 className="text-3xl font-bold dark:text-white">{user?.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">Member since {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <img src={assets.credit_star} alt="Credits" className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{credit}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Credits Remaining</p>
            </div>
            
            <div className="bg-green-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🖼️</div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{generatedImages.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Images Generated</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">💳</div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{transactions.length}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Transactions</p>
            </div>
          </div>
        </div>

        {/* Generated Images Gallery */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold dark:text-white mb-6">Generated Images</h2>
          
          {generatedImages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <p className="text-gray-600 dark:text-gray-400">No images generated yet</p>
              <button 
                onClick={() => window.location.href = '/result'}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Generate Your First Image
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {generatedImages.map((img, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={img.imageUrl} 
                    alt={img.prompt} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                      <p className="text-sm line-clamp-2">{img.prompt}</p>
                      <p className="text-xs mt-2 text-gray-300">{new Date(img.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold dark:text-white mb-6">Transaction History</h2>
          
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📜</div>
              <p className="text-gray-600 dark:text-gray-400">No transactions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-4 dark:text-white">Date</th>
                    <th className="text-left py-3 px-4 dark:text-white">Plan</th>
                    <th className="text-left py-3 px-4 dark:text-white">Credits</th>
                    <th className="text-left py-3 px-4 dark:text-white">Amount</th>
                    <th className="text-left py-3 px-4 dark:text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-3 px-4 dark:text-gray-300">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 dark:text-gray-300">{transaction.plan}</td>
                      <td className="py-3 px-4 dark:text-gray-300">{transaction.credits}</td>
                      <td className="py-3 px-4 dark:text-gray-300">${transaction.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          transaction.payment 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {transaction.payment ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
