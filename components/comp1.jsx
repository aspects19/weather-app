import React, { useState } from 'react';
import { Modal, View, Text, Pressable } from 'react-native';

const CustomModal = ({ icon, title, text, visible, dismissCallback }) => {
  return (
    <Modal 
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={dismissCallback}
    >
      <View className='flex-1 justify-center items-center bg-black bg-opacity-50'>
        <View className='m-5 bg-white rounded-xl p-3 items-center'>
          {icon}
          <Text className='text-lg font-bold mb-2'>{title}</Text>
          <Text className='text-center mb-4'>{text}</Text>
          <Pressable className='rounded-xl p-3 bg-[#F194FF]' onPress={dismissCallback}>
            <Text className='text-white font-bold text-center'>Dismiss</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

// Example usage in a parent component
const ParentComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleShowModal = () => {
    setModalVisible(true);
  };

  const handleDismissModal = () => {
    setModalVisible(false);
  };

  return (
    <View className='flex-1 justify-center items-center'>
      <Pressable onPress={handleShowModal}>
        <Text className='text-blue-500'>Show Modal</Text>
      </Pressable>
      <CustomModal 
        icon={<Text>🔔</Text>}  // Example icon
        title="Alert!"
        text="This is an important message."
        visible={modalVisible}
        dismissCallback={handleDismissModal}
      />
    </View>
  );
};

export default ParentComponent;
