
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, Modal,TextInput, TouchableHighlight} from 'react-native'
import React , {useState, useEffect}from 'react'
import ScreenWrapper from '../../ScreenWrapper'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ParticipantForm from './participant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ISection from './isectionlist.js/isectionlist';
import Mesection from './mesection';
import ImagePicker from 'react-native-image-crop-picker';

const Meprofile = ({navigation}) => {
  const [participants, setParticipants] = useState([]);
  const [showParticipantForm, setShowParticipantForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const [question, setQuestion] = useState('');
const [selectedDefaultAnswer, setSelectedDefaultAnswer] = useState(null);
const [profile, setProfile]= useState(null)
const [answer, setAnswer] = useState('');



// mesection
const [selectedTabme, setSelectedTabme] = useState(null);
const [ismeModalVisible, setmeIsModalVisible] = useState(false);
const [selectedItemme, setSelectedItemme] = useState(null);
const [questionme, setQuestionme] = useState('');
const [selectedDefaultAnswerme, setSelectedDefaultAnswerme] = useState(null);

const [answerme, setAnswerme] = useState('');

const [iListData, setIListData] = useState([
  { key: '1', text: 'Brush :', answer: null },
  { key: '2', text: 'Skin type :', answer: null },
  { key: '3', text: 'Hair type :', answer: null },
  { key: '4', text: 'Drinking :', answer: null },
  { key: '5', text: 'Smoking :', answer: null },
  { key: '6', text: 'Tabacco :', answer: null },
  { key: '7', text: 'Life style :', answer: null },
  { key: '8', text: 'Food preference :', answer: null },
]);
const [questionMap, setQuestionMap] = useState({
  '1': 'How often do you brush your teeth?',
  '2': 'What is your skin type?',
  '3': 'Describe your hair type:',
  '4': 'How often do you drink water?',
  '5': 'Do you smoke?',
  '6': 'Do you use tobacco products?',
  '7': 'Describe your lifestyle:',
  '8': 'What are your food preferences?',
});
const [defaultAnswers, setDefaultAnswers] = useState({
  '1': ['Twice a day', 'Once a day', 'Every other day'],
  '2': ['Oily', 'Dry', 'Normal'],
  '3': ['Straight', 'Wavy', 'Curly'],
  '4': ['Rarely', 'Regularly', 'Daily'],
  '5': ['Yes', 'No'],
  '6': ['Yes', 'No'],
  '7': ['Active', 'Sedentary', 'Moderate'],
  '8': ['Vegetarian', 'Vegan', 'Non-vegetarian'],
});

// mesection
const [meListData, setmeListData] = useState([
  { key: '5', text: 'Contacts :', answerme: null },
  { key: '6', text: 'Emergency Contact :', answerme: null },
  { key: '7', text: 'Email :', answerme: null },
  { key: '8', text: 'D.O.B :', answerme: null },
  { key: '9', text: 'Status :', answerme: null },
  { key: '10', text: 'State :', answerme: null },
 
]);
const [questionMapme, setQuestionMapme] = useState({

  
});
const [defaultAnswersme, setDefaultAnswersme] = useState({
 
  '7': ['Straight', 'Wavy', 'Curly'],
  '8': ['Rarely', 'Regularly', 'Daily'],
  '9': ['Yes', 'No'],
  '10': ['Maharashtra', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Jammu and Kashmir', 'Ladakh'],
 
});

  const [selectedImage, setSelectedImage] = useState(null); 
  const addParticipant = () => {
    if (participants.length < 5) {
      setShowParticipantForm(true);
    }
  };

  const handleSaveParticipant = (participantInfo) => {
    if (participants.length < 5) {
      setParticipants((prevParticipants) => [
        ...prevParticipants,
        { ...participantInfo, selectedImage: participantInfo.additionalInfo.image },
      ]);
      setShowParticipantForm(false);
    }
  };
 
  const handleCloseParticipantForm = () => {
    setShowParticipantForm(false);
  };

  const calculateButtonLeft = () => {
    return 30 + Math.min(participants.length, 5) * 89;
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


 

  const handleTabClick = (tab, item) => {
    setSelectedTab(tab);
    setSelectedItem(item);
  
    // Only show the modal when the selected item is in the specified list
    const allowedKeys = iListData.map((item) => item.key);
    if (tab === 'I' && item && allowedKeys.includes(item.key)) {
      toggleModal(); // Show the modal
  
      // Use the question map to dynamically set the question for the selected item
      setQuestion(questionMap[item.key]);
  
      // Check if an answer has already been selected for the item
      const selectedAnswer = item.answer || ''; // Default to an empty string if no answer is selected
      setAnswer(selectedAnswer);
  
      // Set the selected default answer
      setSelectedDefaultAnswer(selectedAnswer);
    }
    
  };
  
  const handleAnswerSubmit = () => {
    // Handle the answer submission logic here
    // Update the state to include the answer for the selected item
    setIListData((prevList) =>
      prevList.map((item) =>
        item.key === selectedItem?.key ? { ...item, answer } : item
      )
    );
    toggleModal(); // Hide the modal
  };

  // mesection
  const toggleModalme = () => {
    setmeIsModalVisible(!ismeModalVisible);
  };


 

  const handleTabClickme = (tab, item) => {
    setSelectedTab('Me');
    setSelectedItemme(item);
  
    // Only show the modal when the selected item is in the specified list
    const allowedKeys = meListData.map((item) => item.key);
    if (tab === 'Me' && item && allowedKeys.includes(item.key)) {
      toggleModalme(); // Show the modal
  
      // Use the question map to dynamically set the question for the selected item
      setQuestionme(questionMapme[item.key]);
  
      // Check if an answer has already been selected for the item
      const selectedAnswerme = item.answerme || ''; // Default to an empty string if no answer is selected
      setAnswerme(selectedAnswerme);
  
      // Set the selected default answer
      setSelectedDefaultAnswerme(selectedAnswerme);
      if (item.key === '5') {
        // Navigate to the "Contacts.js" page
        navigation.navigate('MeContacts'); // Replace 'Contacts' with the actual name of your Contacts screen
      }
      if (item.key === '6') {
        navigation.navigate('EmergencyContacts'); 
      }
    }
    
    
  };

  const handleAnswerSubmitme = () => {
    // Handle the answer submission logic here
    // Update the state to include the answer for the selected item
    setmeListData((prevList) =>
      prevList.map((item) =>
        item.key === selectedItemme?.key ? { ...item, answerme } : item
      )
    );
    toggleModalme(); // Hide the modal
  };

  const imagepick = () =>{
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setProfile(image.path)
    });
  }
  const handleImageSelect = (image) => {
    // Update the state with the selected image
    setSelectedImage(image);
  };
  return (
    <View>
    {showParticipantForm ? (
        <ParticipantForm
          onClose={handleCloseParticipantForm}
          onSave={handleSaveParticipant}
          defaultRelationships={['Brother', 'Sister', 'Mother', 'Father', 'Friend', 'Spouse', 'Grandfather', 'Grandmother', 'Son', 'Daughter', 'Child']}
        />
      ) : (
    <><View style={styles.container}>
                  

              <View style={styles.header}>
                <TouchableHighlight  underlayColor='transparent'
                 onPress={imagepick}>
                <Image
                  style={styles.imageprofile}
                  resizeMode="cover"
                  source={profile ? {uri: profile} : require("../../../assets/isection/emptyavator.png")}
/>
</TouchableHighlight>
                  <Text style={styles.myself}>
                  <Text style={styles.m}>M</Text>
                  <Text style={styles.y}>y</Text>
                  <Text style={styles.s}>s</Text>
                  <Text style={styles.e}>e</Text>
                  <Text style={styles.l}>l</Text>
                  <Text style={styles.f}>f</Text>
                </Text>
                <View style={styles.namesection}>
                  <Text style={styles.fullname}>Gouri Kannurkar</Text>
                  <Text style={styles.gender}>F/</Text>


                </View>
                <Text style={styles.age}>23</Text>
                <Text style={styles.status}>Single</Text>
                <Text style={styles.city}>Pune</Text>
              </View>
              <ScrollView
  
              >
            <View style={styles.Addsection}>
  {participants.length < 5 && (
    <TouchableHighlight onPress={addParticipant} underlayColor='transparent'>
      <>
        <Text style={[styles.text5, { left: calculateButtonLeft() }]}>+</Text>
        <Text style={[{color: "#212121", top: 82, left: 27, fontSize: 13, fontWeight: "400"} , {left: calculateButtonLeft()}]}>Click to add</Text>
      </>
    </TouchableHighlight>
  )}
  <View style={styles.smp04Parent}>
    {participants.map((participant, index) => (
      <View key={index} style={[styles.participantContainer, { left: 86 * index }]}>
        <TouchableHighlight underlayColor='transparent'>
          <Image
            style={[styles.addfirst, styles.iconLayout]}
            resizeMode="cover"
            source={{ uri: participant.selectedImage }}
          />
        </TouchableHighlight>
        <Text style={[styles.partner, styles.sisterTypo]}>
          {participant.relationship.length > 7
            ? `${participant.relationship.slice(0, 7)}\n${participant.relationship.slice(7)}`
            : participant.relationship}
        </Text>
      </View>
    ))}
  </View>
</View>
                          </ScrollView>

              <View style={styles.Mehavei}>
                
              <View style={styles.section2}>
              <TouchableHighlight
              underlayColor='transparent'
                style={[
                  styles.mesection,
                  selectedTab === 'Me' ? styles.selectedTab : null,
                ]}
                onPress={() => handleTabClick('Me')}
              >
                <View>
                  <Text style={[styles.metext, selectedTabme === 'Me' ? styles.boldText : null]}>
                    Me
                  </Text>
                  <View style={styles.borderBottom} />
                </View>
                </TouchableHighlight>

                {selectedTab === 'Me' && (
                <Mesection
                  ismeModalVisible={ismeModalVisible}
                  toggleModalme={toggleModalme}
                  handleTabClickme={handleTabClickme}
                  meListData={meListData}
                  questionMapme={questionMapme}
                  handleAnswerSubmitme={handleAnswerSubmitme}
                  defaultAnswersme={defaultAnswersme}
                  selectedItemme={selectedItemme}
                  answer={answer}
                  setAnswerme={setAnswerme}
                  selectedDefaultAnswerme={selectedDefaultAnswerme}
                  setSelectedDefaultAnswerme={setSelectedDefaultAnswerme}
                />
              )}
                <TouchableHighlight
                 underlayColor='transparent'
                  style={[
                    styles.havesection,
                    selectedTab === 'Have' ? styles.selectedTab : null,
                  ]}
                  onPress={() => handleTabClick('Have')}
                >
                 <View style={styles.havesection}>
                 <Text style={[styles.havetext, selectedTab === 'Have' ? styles.boldText : null]}>
      Have
    </Text> 
      <View style={styles.borderBottomHave} />
</View>
                </TouchableHighlight>

                <TouchableHighlight
                 underlayColor='transparent'
                  style={[
                    styles.isection,
                    selectedTab === 'I' ? styles.selectedTab : null,
                  ]}
                  onPress={() => handleTabClick('I')}
                >
                 <View style={styles.itext}>
                 <Text style={[styles.itext, selectedTab === 'I' ? styles.boldText : null]}>
      i
    </Text>  
     <View style={styles.borderBottom} />
</View>
                </TouchableHighlight>
              </View>


              {/* Render different content based on the selected tab */}

              {selectedTab === 'I' && (
              <ISection
                isModalVisible={isModalVisible}
                toggleModal={toggleModal}
                handleTabClick={handleTabClick}
                iListData={iListData}
                questionMap={questionMap}
                handleAnswerSubmit={handleAnswerSubmit}
                defaultAnswers={defaultAnswers}
                selectedItem={selectedItem}
                answer={answer}
                setAnswer={setAnswer}
                selectedDefaultAnswer={selectedDefaultAnswer}
                setSelectedDefaultAnswer={setSelectedDefaultAnswer}
              />
            )}
                            </View>

            </View><View style={styles.footer}></View></>

       
        )}
   

    </View>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    minHeight: hp("70%"),
  },
container:{
  
  backgroundColor:"#FFF"
},
header:{
  height:hp("25%"),
  backgroundColor:"#FFF"
},
Addsection:{
  height:hp("15%"),
  backgroundColor:"#FFF"


},
section2: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

Mehavei:{
  height:hp("53%"),
  backgroundColor:"#FFF",
  
},
footer:{
  height:hp("7%"),
  backgroundColor:"#FFF"


},

// header section
imageprofile:{
  top:41,
    left: 30,
    borderRadius: 51,
    width: hp(17),
    height: hp(17),
    position: "absolute",
    borderWidth: 5, // Adds a white border around the container
    borderColor: '#FFF', // Border color
    backgroundColor: '#C4C4C4', // Sets a solid background color with the specified color code (#C4C4C4)
    shadowColor: '#CCC', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (horizontal and vertical)
    shadowRadius: 25, // Shadow blur radius
    shadowOpacity: 0.3, // Shadow opacity
    borderStyle:"solid"
  },
  m: {
    color: "#4a90e2",
  },
  y: {
    color: "#d0021b",
  },
  s: {
    color: "#7ed321",
  },
  e: {
    color: "#f8e71c",
  },
  l: {
    color: "#f5a623",
  },
  f: {
    color: "#b888b8",
  },
  myself: {
    fontSize: 18,
    fontWeight: "600",
    top: hp("9%"),
    left:187
    
  },
  namesection:{
    left: 187,
    position: "absolute",
    top:103,

  },
 
  fullname:{
    fontSize:17,
    color:"#291E17"

  },
  age:{
    fontWeight:"200",
    left: 206,
    position: "absolute",
    top:126,
    fontSize:17,
    color:"#291E17"

    
  },
  status:{
    left: 235,
    position: "absolute",
    fontSize:17,
    top:126,
    color:"#291E17"

  },
  gender:{
    fontSize:17,
    


  },
  city:{
    left: 187,
    position: "absolute",
    fontSize:17,
    top: 148,
    fontWeight:"100",
    color:"#291E17"

  },
  // Header section over

  // Add section
  iconLayout: {
    height: 80,
    width: 80,
    position: "absolute",
  },
  text5: {
    left: 300,
    fontSize: 23,
    fontWeight: "500",
    textAlign: "center",
    color: "#626262",
    position: "absolute",
top:5,   
    borderRadius:51,
    borderColor:"#9E9E9E",
    borderWidth:2,
    width:70,
    height:70,
  },
  plussignborder:{
    borderRadius:40,
    borderColor:"#9E9E9E",
    borderWidth:2,
    width:60,
    height:60,
  },

  addfirst: {
    right:130,
    borderRadius: 51,
    borderWidth: 4,
borderColor: 'white',

backgroundColor: 'lightgray',
// Box shadow
shadowColor: '#454545',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.45,
shadowRadius: 10,


  },
  addsecond: {
    left: 79,
    borderRadius: 51,
    borderWidth: 4,
borderColor: '#FFF',
marginRight: 10, // Adjust the value to set the desired space between images


  },
  addthird: {
    left: -10,
    borderRadius: 51,
    borderWidth: 4,
borderColor: '#FFF',
marginRight: 10, // Adjust the value to set the desired space between images


  },
  partner: {
    left: 21,
    textAlign:"center",
    alignItems:"center"

  },
  sister: {
    left: 99,

  },
  mother: {
    left: 189,

  },
  smp04Parent: {
    width: 210,
    height: 86,
    left: 30,
    position: "absolute",


  },
  sisterTypo: {
    fontSize: 13,
    top: 83,
    color: "#291E17",
    position: "absolute",
    textAlign:"center"

  },
  // section2 start

  mesection: {
    left:51,
    alignItems: 'center',
    borderColor: 'transparent',
    borderBottomColor: '#CC9B66',
    paddingBottom: 0,


  },
  havesection: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderBottomColor: '#CC9B66',
    color:"#291E17"
  },
  isection: {
    right:71,
    alignItems: 'center',
    borderColor: 'transparent',
    borderBottomColor: '#CC9B66',
    
  },
  metext: {
    fontSize: 21,
    alignContent:"center",
    alignSelf:"center",
    fontWeight:"400",
    color:"#291E17"
  },
  havetext: {
    fontSize: 21,
    color:"#291E17",
    alignContent:"center",
    alignSelf:"center",
    fontWeight:"300"
  },
  itext: {
    fontSize: 21,
    alignItems: 'center',
    fontWeight:"400",
    color:"#291E17"

  },
  boldText:{
fontWeight:"600"
  },
  borderBottom: {

    width: 21,
  },
  selectedTab: {
    borderColor: '#CC9B66',
    borderBottomWidth: 5,
    height: 30,
    fontWeight: '600',
  },
  borderBottomHave: {
    width: 55,
  },
  borderBottomMe: {
   
    width: 38,
    alignContent:"center",
    alignSelf:"center"
  },


  sectiontexts:{
    fontSize: 17,
    left:20,
color:"#291E17",
fontWeight:"700"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    height:hp("70%"),
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    left:30

  },
  modalInput: {
    
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,

  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    position:"absolute",
    alignSelf:"flex-end",
    right: 30
  },
  modalButtonText: {
    color: '#2D8AE0',
    fontSize: 17,
    fontWeight:"500"
  },
  Sliderfirsttext:{
    color:"#CC9B66",
    fontSize: 28,
    fontWeight:"600",
    left:30,
    top:71

  },
  listItemslider: {
    left: 30,
    marginTop: 29,
    borderBottomWidth: 0.6,
    borderBottomColor: "#CC9B66",
    height: 30,
    width: 340,
    fontWeight: "500",
    color: "#291E17",
    top: 100,
  },
  sectiontextsslider: {
    fontSize: 17,
    left: 14,
    fontWeight: "500",
    color: "#291E17",
    bottom: 5,
    paddingRight: 100,
  },


  checkmark: {
    position: 'absolute',
    right: 200, // Adjust this value to move the checkmark to the desired position
    top: '50%', // Adjust this value to center the checkmark vertically
    color: '#000000', // You can adjust the color of the checkmark
  },
// powered by doc
bottomparent: {
  height: "61.63%",
  width: "76.53%",
  top: "0%",
  right: "11.73%",
  bottom: "38.37%",
  left: "11.73%",
  position: "absolute",
},
poweredbyicon: {
height: 36,
width:33,
  bottom: "0%",
  left: "0%",
  borderRadius: 5,
  maxWidth: "100%",
  maxHeight: "100%",
  position: "absolute",
  overflow: "hidden",
},
poweredByParent: {
  bottom: 1,
  left: 43,
  width: 69,
  height: 33,
  position: "absolute",
},
poweredBy: {
  bottom: 19,
  fontSize: 12,
  lineHeight: 13,
  color: "rgba(60, 60, 67, 0.60)",
  fontWeight: "500",
  textAlign: "left",
    fontFamily: "500",
    left: 0,
    position: "absolute",
},
withDocs: {
  bottom: 0,
  fontSize: 13,
  letterSpacing: 0,
  lineHeight: 15,
  color: "#000",
  fontWeight: "600",
  textAlign: "left",
    fontFamily: "500",
    left: 0,
    position: "absolute",
},
groupItem: {
  borderColor: "#c5c5c5",
  borderTopWidth: 1,
  width: 288,
  top: 425  ,
  borderStyle: "solid",
},
groupItemPosition: {
  height: 1,
  left: 0,
  position: "absolute",
},
scrollContainer:{
flex:1,
height: '100%',
backgroundColor: '#FFF',

}

});

export default Meprofile;
