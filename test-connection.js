const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gradientlib';

console.log('Testing MongoDB connection...');
console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

// Test different connection strategies
async function testConnection() {
  const strategies = [
    { uri: MONGODB_URI, description: 'Original' },
    { uri: MONGODB_URI.replace('mongodb+srv://', 'mongodb://'), description: 'Standard MongoDB' },
    { uri: MONGODB_URI + '&dnsServer=8.8.8.8', description: 'With Google DNS' },
    { uri: MONGODB_URI + '&dnsServer=1.1.1.1', description: 'With Cloudflare DNS' }
  ];

  for (const strategy of strategies) {
    try {
      console.log(`\nTrying ${strategy.description}...`);
      
      const connectionOptions = {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4, // Force IPv4
      };

      await mongoose.connect(strategy.uri, connectionOptions);
      console.log(`✅ SUCCESS with ${strategy.description}!`);
      
      // Test a simple operation
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('Available collections:', collections.map(c => c.name));
      
      await mongoose.disconnect();
      return true;
      
    } catch (error) {
      console.log(`❌ FAILED with ${strategy.description}:`, error.message);
      if (error.code === 'ETIMEOUT') {
        console.log('  This is a DNS resolution timeout');
      }
    }
  }
  
  console.log('\n❌ All connection strategies failed');
  return false;
}

testConnection()
  .then(success => {
    if (success) {
      console.log('\n🎉 Connection test successful!');
    } else {
      console.log('\n💡 Suggestions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify your MongoDB Atlas cluster is running');
      console.log('3. Check if your IP is whitelisted in MongoDB Atlas');
      console.log('4. Try using a local MongoDB: mongodb://localhost:27017/gradientlib');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  }); 