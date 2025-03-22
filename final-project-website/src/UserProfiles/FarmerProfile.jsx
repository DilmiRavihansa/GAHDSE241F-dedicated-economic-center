import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./farmerP.css";
import styled from "styled-components";
import axios from "axios"; // Add axios for API calls

// API base URL - change this to match your backend server address
const API_BASE_URL = "http://localhost:5000/api";

const StyledButton = styled.button`
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(45deg, #4158D0, #C850C0);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: linear-gradient(45deg, #3a4fbd, #b747af);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }
`;

// Custom object-shaped profile upload box with custom position
const ObjectShapedBox = styled.div`
  position: relative;
  width: 400px;  // Medium-sized box width
  height: 300px; // Medium-sized box height
  margin: 0 0 30px 0; // Remove auto margin - position at the left
  cursor: pointer;
  
  .profile-image {
    width: 100%;
    height: 100%;
    border-radius: 0; // Sharp corners for object-like shape
    object-fit: cover;
    border: 3px solid #4158D0; // Colored border to highlight the object shape
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }
  
  .profile-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 0; // Sharp corners
    background: linear-gradient(145deg, #e6e7e9, #f6f7f9);
    border: 3px solid #4158D0; // Colored border
    box-shadow: 8px 8px 0px #C850C0; // Offset shadow for 3D object look
    color: #555;
    font-weight: 500;
    transition: all 0.3s ease;
    text-align: center;
    padding: 15px;
    position: relative;
  }
  
  .profile-placeholder:hover {
    transform: translate(-2px, -2px);
    box-shadow: 10px 10px 0px #C850C0;
  }
  
  .profile-upload-icon {
    position: absolute;
    bottom: -10px;
    right: -10px;
    background: #4158D0;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 0; // Square icon to match object theme
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 3px 3px 0px #C850C0;
    transition: all 0.3s ease;
    font-size: 18px;
  }
  
  .profile-upload-icon:hover {
    transform: translate(-2px, -2px);
    box-shadow: 5px 5px 0px #C850C0;
  }
`;

// Notification component
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  background-color: ${props => props.type === 'success' ? '#4CAF50' : '#f44336'};
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slideIn 0.3s forwards;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

export default function UserProfileForm() {
  // User profile state
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePath, setProfileImagePath] = useState('');
  
  // Product state
  const [productImages, setProductImages] = useState([]);
  const [productImageFiles, setProductImageFiles] = useState([]);
  const [productImagePaths, setProductImagePaths] = useState([]);
  
  // Form data state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [address, setAddress] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  
  // Product form data state
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDetails, setProductDetails] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [userId, setUserId] = useState(null);

  // Show notification helper
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 5000);
  };

  // Handle profile image selection
  const handleProfileImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handle product images selection
  const handleProductImagesChange = (e) => {
    if (e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setProductImageFiles(prev => [...prev, ...files]);
      
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setProductImages(prev => [...prev, ...newPreviewUrls]);
    }
  };

  // Upload profile image to server
  const uploadProfileImage = async () => {
    if (!profileImageFile) return '';
    
    try {
      const formData = new FormData();
      formData.append('profileImage', profileImageFile);
      
      const response = await axios.post(`${API_BASE_URL}/upload-profile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      return response.data.filePath;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      showNotification('error', 'Failed to upload profile image');
      return '';
    }
  };

  // Upload product images to server
  const uploadProductImages = async () => {
    if (productImageFiles.length === 0) return [];
    
    try {
      const formData = new FormData();
      productImageFiles.forEach(file => {
        formData.append('productImages', file);
      });
      
      const response = await axios.post(`${API_BASE_URL}/upload-products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      return response.data.filePaths;
    } catch (error) {
      console.error('Error uploading product images:', error);
      showNotification('error', 'Failed to upload product images');
      return [];
    }
  };

  // Save user profile to server
  const saveUserProfile = async (profileImagePath) => {
    try {
      const userData = {
        username,
        email,
        age: age || null,
        aboutMe,
        address,
        idNumber,
        phoneNumber,
        location,
        workExperience,
        facebookLink,
        instagramLink,
        profileImagePath
      };
      
      const response = await axios.post(`${API_BASE_URL}/user-profile`, userData);
      setUserId(response.data.userId);
      return response.data.userId;
    } catch (error) {
      console.error('Error saving user profile:', error);
      showNotification('error', 'Failed to save user profile');
      throw error;
    }
  };

  // Save product to server
  const saveProduct = async (userId, productImagePaths) => {
    try {
      const productData = {
        userId,
        productName,
        productPrice: productPrice || 0,
        productDetails,
        productImagePaths
      };
      
      const response = await axios.post(`${API_BASE_URL}/add-product`, productData);
      return response.data.productId;
    } catch (error) {
      console.error('Error saving product:', error);
      showNotification('error', 'Failed to save product');
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username) {
      showNotification('error', 'Username is required');
      return;
    }
    
    setLoading(true);
    
    try {
      // 1. Upload profile image
      const uploadedProfileImagePath = await uploadProfileImage();
      
      // 2. Save user profile
      const userId = await saveUserProfile(uploadedProfileImagePath);
      
      // 3. Upload product images
      const uploadedProductImagePaths = await uploadProductImages();
      
      // 4. Save product (if name is provided)
      if (productName) {
        await saveProduct(userId, uploadedProductImagePaths);
      }
      
      showNotification('success', 'Data saved successfully!');
      
      // Reset product form
      setProductName('');
      setProductPrice('');
      setProductDetails('');
      setProductImages([]);
      setProductImageFiles([]);
      setProductImagePaths([]);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      showNotification('error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {notification.show && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
      
      <form onSubmit={handleSubmit} className="form-container">
        {/* User Profile Section */}
        <div className="form-section">
          <h1 className="section-title">User Profile</h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div>
              {/* Object-shaped Profile Box with custom position */}
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <ObjectShapedBox>
                  <div
                    onClick={() => document.getElementById("profileInput").click()}
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="profile-image"
                      />
                    ) : (
                      <div className="profile-placeholder">
                        <div>
                          <i className="fas fa-user" style={{ fontSize: '32px', marginBottom: '10px' }}></i>
                          <div>Click to Upload</div>
                        </div>
                      </div>
                    )}
                    <div className="profile-upload-icon">
                      <i className="fas fa-camera"></i>
                    </div>
                  </div>
                  <input
                    id="profileInput"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleProfileImageChange}
                    accept="image/*"
                  />
                </ObjectShapedBox>
              </div>

              {/* Personal Information */}
              <div className="form-field">
                <label className="field-label">Username</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label className="field-label">Email Address</label>
                <input
                  type="email"
                  className="field-input"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label className="field-label">Age</label>
                <input
                  type="number"
                  className="field-input"
                  placeholder="Enter Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">About Me</label>
                <textarea
                  className="field-input"
                  placeholder="Tell something about yourself"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div>
              {/* Contact Information */}
              <div className="form-field">
                <label className="field-label">Address</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">ID Number</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="Enter ID Number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">Phone Number</label>
                <input
                  type="tel"
                  className="field-input"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">Location</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="Enter Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">Work Experience</label>
                <textarea
                  className="field-input"
                  placeholder="Describe your work experience"
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                ></textarea>
              </div>

              <div className="form-field">
                <label className="field-label">Social Media Links</label>
                <div className="social-media-inputs">
                  <div className="social-media-input">
                    <input
                      type="url"
                      className="field-input social-media-field"
                      placeholder="Facebook Profile URL"
                      value={facebookLink}
                      onChange={(e) => setFacebookLink(e.target.value)}
                    />
                  </div>
                  <div className="social-media-input">
                    <input
                      type="url"
                      className="field-input social-media-field"
                      placeholder="Instagram Profile URL"
                      value={instagramLink}
                      onChange={(e) => setInstagramLink(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="form-section">
          <h1 className="section-title">Add Product</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <div>
              <div className="form-field">
                <label className="field-label">Product Images</label>
                <div className="file-input-container">
                  <label className="file-input-label">
                    Choose Product Images
                    <input
                      type="file"
                      multiple
                      className="file-input"
                      onChange={handleProductImagesChange}
                      accept="image/*"
                    />
                  </label>
                </div>
                <div className="product-gallery">
                  {productImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt="Product"
                      className="product-image"
                    />
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label className="field-label">Product Name</label>
                <input
                  type="text"
                  className="field-input"
                  placeholder="Enter Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="form-field">
                <label className="field-label">Product Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="field-input"
                  placeholder="Enter Product Price"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label className="field-label">Product Details</label>
                <textarea
                  className="field-input"
                  placeholder="Enter Product Details"
                  value={productDetails}
                  onChange={(e) => setProductDetails(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="button-container">
          <StyledButton type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Upload'}
          </StyledButton>
        </div>
      </form>
    </div>
  );
}