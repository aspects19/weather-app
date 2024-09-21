import { Modal, Text, View, TouchableOpacity } from "react-native";

const CustomModal = ({ icon, title, text, visible, dismissCallback }) => {
  return (
    <Modal 
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={dismissCallback}
    >
      <View className='flex-1 justify-center items-center bg-[#0000007e]'>
        <View className='m-5 bg-[#575757] rounded-xl p-3 items-center w-8/12'>
          <Text className='text-lg font-bold text-white mb-2 pl-2'>{icon} {title}</Text>
          <Text className='text-center text-slate-300 mb-4'>{text}</Text>
          <TouchableOpacity className='rounded-xl p-3 bg-[#725b1c] ' onPress={dismissCallback}>
            <Text className='text-white font-bold text-center'>Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;