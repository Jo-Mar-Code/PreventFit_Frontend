import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Dimensions } from "react-native";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { useEffect } from 'react';

import {
  LineChart,
  BarChart,
} from "react-native-chart-kit";

export default function SuiviScreen() {

  const user = useSelector((state) => state.user.value);
  const screenWidth = Dimensions.get("window").width;
  const [statHydrate, setStatHydrate] = useState(null);
  const [statsWeek, setStatsWeek] = useState([]);
  const [statEnergyLevel, setStatEnergyLevel] = useState(null);
  const [statMood, setStatMood] = useState(null);
  const [statSleepQuality, setStatSleepQuality] = useState(null);
  const [statTrainingEnergy, setStatTrainingEnergy] = useState(null);
  const [isThirsty, setIsThirsty] = useState(null); 
  const [isThirstyWeek, setIsThirstyWeek] = useState([]);
  const [NightWakeUpWeek, setNightWakeUpWeek] = useState([]);
  const [NoSleepWeek, setNoSleepWeek] = useState([]);
  const [morningFatigueWeek, setMorningFatigueWeek] = useState([]);
  const [trainingInjuryWeek, setTrainingInjuryWeek] = useState([]);
  const [trainingFatigueWeek, setTrainingFatigueWeek] = useState([]);
  const [musclePainWeek, setmusclePainWeek] = useState([]);
  const [bloatingWeek, setBloatingWeek] = useState([]);
  const [appetitLackWeek, setappetitLackWeek] = useState([]);
  const [hungryFeelWeek, sethungryFeelWeek] = useState([]);
  const [intestinPainWeek, setIntestinPainWeek] = useState([]);
  const [NightWakeUp, setNightWakeUp] = useState(null);
  const [insomnies, setInsomnies] = useState(null);
  const [morningFatigue, setMorningFatigue] = useState(null);
  const [musclePain, setMusclePain] = useState(null);
  const [injury, setInjury] = useState(null);
  const [trainingFatigue, setTrainingFatigue] = useState(null);
  const [bloating, setBloating] = useState(null);
  const [appetiteLack, setAppetiteLack] = useState(null); 
  const [intestinPain, setIntestinPain] = useState(null);
  const [hungryFeel, setHungryFeel] = useState(null);
  const [jour, setJour] = useState(0);
  const [date, setDate] = useState(null);
  const [durée, setDurée] = useState(null);
  const [periodDay, setPeriodDay] = useState(false);
  const [periodWeek, setPeriodWeek] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [clickedDay, setClickedDay] = useState(null);
  const[valueClickedDay, setValueClickedDay] = useState(null);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(moment().startOf('isoWeek'));
  const [statsWeekPrev, setStatsWeekPrev] = useState([]);
const [statsWeekNext, setStatsWeekNext] = useState([]);
  const [dropDownValue, setDropDownValue] = useState({});
  const currentDate = moment(date).format('DD/MM/YYYY');
  const inputPeriod = [   { label: 'Jour', value: '1' },{ label: 'Semaine', value: '2' },]

  const chartConfigDay = {
    backgroundGradientFrom: "red",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "red",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(38, 70, 83, ${opacity})`,
    strokeWidth: 1,
    barPercentage: 2,
    useShadowColorFromDataset: false,
    yAxisSuffix: "",
    yAxisOrigin: 0,
    yAxisMin: 0,
    decimalPlaces: 2,
    propsForDots: {
      r: "5",
      strokeWidth: "1",
      stroke: "#E76F51"
    },
  }
  useEffect(() => {
    
    if (dropDownValue.label === 'Jour' || dropDownValue.label === undefined) {
      setPeriodDay(true);
      setPeriodWeek(false);
    fetch(`http://192.168.1.22:3000/stats/getFeedback/${user.token}`)
      .then(response => response.json())
      .then(data => {
        if (data.data.length > 0) {
          const lastStat = data.data[data.data.length - 1 - jour];
          setStatHydrate(lastStat.Hydratation_quantity);
          setStatEnergyLevel(lastStat.Energy_level);
          setStatMood(lastStat.Motivation);
          setStatSleepQuality(lastStat.Sleep_quality);
          setStatTrainingEnergy(lastStat.Training_feel);
          setDate(lastStat.Date);
          setIsThirsty(lastStat.Thirsty_feel);
          setAppetiteLack(lastStat.Appetit_lack);
          setBloating(lastStat.Bloating);
          setHungryFeel(lastStat.Hungry_feel);
          setInjury(lastStat.Training_injury);
          setInsomnies(lastStat.No_sleep);
          setIntestinPain(lastStat.Intestin_Pain);
          setMorningFatigue(lastStat.Morning_fatigue);
          setMusclePain(lastStat.Muscle_pain);
          setNightWakeUp(lastStat.Night_wakeup);
          setTrainingFatigue(lastStat.Training_fatigue);
          setDurée(data.data.length);
        }
      })
    }
    else if (dropDownValue.label === 'Semaine' || dropDownValue.label === undefined) {
      setPeriodDay(false);
      setPeriodWeek(true);
      
      fetch(`http://192.168.1.22:3000/stats/getFeedback/${user.token}`)
    .then(response => response.json())
    .then(data => {
      if (data.data.length > 0) {
        
       
  
        const prevWeekData = data.data.filter(stat => {
          const statDate = moment(stat.Date);
         
          return statDate.isBetween(
            moment(firstDayOfWeek).subtract(1, 'week').startOf('day'), // Début de la semaine précédente
            moment(firstDayOfWeek).startOf('day') // Fin de la semaine précédente
          );
        });
        
  
        setStatsWeekPrev(prevWeekData);

        const nextWeekData = data.data.filter(stat => {
          const statDate = moment(stat.Date);
        
          return statDate.isBetween(
            moment(firstDayOfWeek).add(7, 'days').startOf('day'), // Début de la semaine suivante
            moment(firstDayOfWeek).add(14, 'days').startOf('day') // Fin de la semaine suivante
          );
        });

        setStatsWeekNext(nextWeekData);

  
// Filtrer les statistiques de la semaine actuelle
        const currentWeekStats = data.data.filter(stat => {
          const statDate = moment(stat.Date);
          return statDate.isBetween(
            firstDayOfWeek, // Début de la semaine actuelle
            moment(firstDayOfWeek).add(7, 'days') // Fin de la semaine actuelle
          );
        });

        // Trier les statistiques par date
        const sortedStats = currentWeekStats.sort((a, b) => moment(a.Date) - moment(b.Date));

        // Filtrer les jours sans feedback
        const filteredStats = sortedStats.filter(stat => stat.Date !== null);

        // const hydrateData = filteredStats.map(stat => stat.Hydratation_quantity);

        const statsData = filteredStats.map(stat => ({
          date: stat.Date,
          hydratation_quantity: stat.Hydratation_quantity,
            Thirsty_feel: stat.Thirsty_feel,
            Energy_level: stat.Energy_level,
            Sleep_quality: stat.Sleep_quality,
            Night_wakeup: stat.Night_wakeup,
            No_sleep: stat.No_sleep,
            Morning_fatigue: stat.Morning_fatigue,
            Motivation: stat.Motivation,
            Training_feel: stat.Training_feel,
            Training_injury: stat.Training_injury,
            Training_fatigue: stat.Training_fatigue,
            Muscle_pain: stat.Muscle_pain,
            Bloating: stat.Bloating,
            Appetit_lack: stat.Appetit_lack,
            Hungry_feel: stat.Hungry_feel,
            Intestin_Pain: stat.Intestin_Pain,
        }));

     

           setStatsWeek(statsData);


           for (const stat of statsData) {
            if (stat.Thirsty_feel === true) {
              setIsThirstyWeek(prevIsThirstyWeek => [...prevIsThirstyWeek, stat.Thirsty_feel]);
            }
            if (stat.Night_wakeup === true) {
              setNightWakeUpWeek(prevNightWakeUpWeek => [...prevNightWakeUpWeek, stat.Night_wakeup]);
            }
            if (stat.No_sleep === true) {
              setNoSleepWeek(prevNoSleepWeek => [...prevNoSleepWeek, stat.No_sleep]);
            }
            if (stat.Morning_fatigue === true) {
              setMorningFatigueWeek(prevMorningFatigueWeek => [...prevMorningFatigueWeek, stat.Morning_fatigue]);
            }
            if (stat.Training_injury === true) {
              setTrainingInjuryWeek(prevTrainingInjuryWeek => [...prevTrainingInjuryWeek, stat.Training_injury]);
            }
            if (stat.Training_fatigue === true) {
              setTrainingFatigueWeek(prevTrainingFatigueWeek => [...prevTrainingFatigueWeek, stat.Training_fatigue]);
            }
            if (stat.Muscle_pain === true) {
              setmusclePainWeek(prevmusclePainWeek => [...prevmusclePainWeek, stat.Muscle_pain]);
            }
            if (stat.Bloating === true) {
              setBloatingWeek(prevBloatingWeek => [...prevBloatingWeek, stat.Bloating]);
            }
            if (stat.Appetit_lack === true) {
              setappetitLackWeek(prevappetitLackWeek => [...prevappetitLackWeek, stat.Appetit_lack]);
            }
            if (stat.Hungry_feel === true) {
              sethungryFeelWeek(prevhungryFeelWeek => [...prevhungryFeelWeek, stat.Hungry_feel]);
            }
            if (stat.Intestin_Pain === true) {
              setIntestinPainWeek(prevIntestinPainWeek => [...prevIntestinPainWeek, stat.Intestin_Pain]);
            }    
          }

          

        

        // Utiliser la première date avec feedback dans la semaine
        setDate(filteredStats.length > 0 ? filteredStats[0].Date : null);
        // setIsThirsty(filteredStats.length > 0 ? filteredStats[0].Thirsty_feel : null);
        setDurée(data.data.length);
      }
    });
}
    
  }, [jour, dropDownValue ]); 


  const jourPrécédent = () => {
    if (jour < durée - 1) {
      setJour(prevJour => prevJour + 1);
    }
  }
  const jourSuivant = () => {
    if (jour > 0) {
      setJour(prevJour => prevJour - 1);
    }
  }

  const HydrateDay = {
    labels: [ "Quantité d'eau bue en Cl" ],
    
    datasets: [
      {
        data: [ statHydrate]
      },
    ],
  };

  const EnergyLevelDay = {
    labels: [ "Niveau d'énergie" ],
    
    datasets: [
      {
        data: [ statEnergyLevel]
      },
    ],
  };

  const MoodDay = {
    labels: [ "Niveau de motivation" ],
    datasets: [
      {
        data : [statMood],
      },
    ],
  };

  const SleepQualityDay = {
    labels: [ "Qualité du sommeil" ],
    datasets: [
      {
        data : [statSleepQuality],
      },
    ],
  };

  const TrainingEnergyDay = {
    labels: [ "Niveau d'énergie à l'entrainement" ],
    datasets: [
      {
        data : [statTrainingEnergy],
      },
    ],
  };

  const chartConfigWeek = {
    backgroundGradientFrom: "red",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "red",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(38, 70, 83, ${opacity})`,
    strokeWidth: 1,
    barPercentage: 2,
    useShadowColorFromDataset: false,
    yAxisSuffix: "",
    yAxisOrigin: 0,
    yAxisMin: 0,
    decimalPlaces: 2,
    propsForDots: {
      r: "5",
      strokeWidth: "1",
      stroke: "#E76F51"
    },
    showYAxisLabel: false,
  }
 
const HydrateWeek = {
     datasets: [
      {
        data: statsWeek.map(stat => stat.hydratation_quantity)
        
      },
    ],
    legend: ["Niveau d'hydratation moyen de la semaine en cL"]
  };

  const EnergyWeek = {
    datasets: [
     {
       data: statsWeek.map(stat => stat.Energy_level)
       
     },
   ],
   legend: ["Niveau d'énergie moyen de la semaine"]
 };

 const SleepWeek = {
  datasets: [
   {
     data: statsWeek.map(stat => stat.Sleep_quality)
     
   },
 ],
 legend: ["Niveau de qualité du sommeil moyen de la semaine"]
};

const MotivationWeek = {
  datasets: [
   {
     data: statsWeek.map(stat => stat.Motivation)
     
   },
 ],
 legend: ["Niveau de qualité du sommeil moyen de la semaine"]
};

const TrainingWeek = {
  datasets: [
   {
     data: statsWeek.map(stat => stat.Training_feel)
     
   },
 ],
 legend: ["Niveau de qualité du sommeil moyen de la semaine"]
};
  
  
  const semainePrécédente = () => {
    if (statsWeek.length >=  0) {
      const newDate = moment(firstDayOfWeek).subtract(1, 'week').startOf('isoWeek');
     
      setFirstDayOfWeek(newDate);
      setJour(prevJour => prevJour + 7);
      console.log('Nouvelle date :', newDate.format('DD/MM/YYYY'));
    }
    setClickedDay(null);
    setIsThirstyWeek([]);
  };
  
  const semaineSuivante = () => {
    if (statsWeek.length > 0 && moment().isAfter(firstDayOfWeek, 'day')) {
      const newDate = moment(firstDayOfWeek).add(7, 'days');
      setFirstDayOfWeek(newDate);
      setJour(prevJour => prevJour - 7);
    }  
    setClickedDay(null);
    setIsThirstyWeek([]);
  };

  const handleDataPointClick = (index, name) => {
    // Récupérer le jour correspondant à l'index du point de données
    const dateCliquee = moment(statsWeek[index].date).locale('fr').format('dddd');
    const majDay = dateCliquee.charAt(0).toUpperCase() + dateCliquee.slice(1).toLowerCase();

    const valueDay = statsWeek[index].hydratation_quantity;
  
    // Afficher le jour concerné
    setClickedDay(majDay);
    setValueClickedDay(valueDay);
  
  };

 

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>Suivi Screen</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        inputSearchStyle={styles.inputSearchStyle}
        data={inputPeriod}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Filtrez par période' : '...'}
        searchPlaceholder="Search..."
        value={dropDownValue.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        
        xLabelsOffset={100}
        onChange={item => {
          setDropDownValue(item);
          setIsFocus(false);
          
          

        }} />
        {periodDay && 
        <View>
      <View style={styles.divBtn}>
      <TouchableOpacity onPress={() => jourPrécédent()} style={styles.btnPeriod}>
        <Text style={styles.btnText}>Jour précédent</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => jourSuivant()} style={styles.btnPeriod}>
        <Text style={styles.btnText}>Jour suivant</Text>
      </TouchableOpacity>
      </View>
      
      <ScrollView>
        {/* Graph hydratation / jour  */}
        <View style={styles.graphContainer}>
          <View style={styles.graph}>
          <Text style={styles.titleGraph}>Hydratation</Text>
          <Text style={styles.dateGraph}>{currentDate}</Text>
          <BarChart
            data={HydrateDay}
            width={screenWidth}
            height={250}
            yAxisLabel=""
            chartConfig={chartConfigDay}
            verticalLabelRotation={0}
            fromZero={true}
            showValuesOnTopOfBars={false}
          />
          <View style={styles.description}>
          {isThirsty ? <Text style={styles.descriptionGraph}>Sensation de soif : Oui </Text> : <Text style={styles.descriptionGraph}>Sensation de soif : Non</Text>}
          </View>
          </View>
          
          {/* Graph niveau d'énergie / jour  */}
          <View style={styles.graph}>
          <Text style={styles.titleGraph}>Énergie</Text>
          <Text style={styles.dateGraph}>{currentDate}</Text>
          <BarChart
            data={EnergyLevelDay}
            width={screenWidth}
            height={250}
            yAxisLabel=""
            chartConfig={chartConfigDay}
            verticalLabelRotation={0}
            fromZero={true}
            showValuesOnTopOfBars={false}
          />
          </View>

          {/* Graph qualité du sommeil / jour  */}

          <View style={styles.graph}>
          <Text style={styles.titleGraph}>Qualité du sommeil</Text>
          <Text style={styles.dateGraph}>{currentDate}</Text>
          <BarChart
            data={SleepQualityDay}
            width={screenWidth}
            height={250}
            yAxisLabel=""
            chartConfig={chartConfigDay}
            verticalLabelRotation={0}
            fromZero={true}
            showValuesOnTopOfBars={false}
          />
          <View style={styles.description}>
          {insomnies ? <Text style={styles.descriptionGraph}>Insomnies : Oui </Text> : <Text style={styles.descriptionGraph}>Insomnies : Non</Text>}
          {morningFatigue ? <Text style={styles.descriptionGraph}>Fatigue matinale : Oui </Text> : <Text style={styles.descriptionGraph}>Fatigue matinale: Non</Text>}
          {NightWakeUp ? <Text style={styles.descriptionGraph}>Réveils nocturnes : Oui </Text> : <Text style={styles.descriptionGraph}>Réveils nocturnes: Non</Text>}
          </View>

          </View>
          {/* Graph niveau de motivation / jour  */}

          <View style={styles.graph}>
          <Text style={styles.titleGraph}>Niveau de motivation à l'entraînement</Text>
          <Text style={styles.dateGraph}>{currentDate}</Text>
          <BarChart
            data={MoodDay}
            width={screenWidth}
            height={250}
            yAxisLabel=""
            chartConfig={chartConfigDay}
            verticalLabelRotation={0}
            fromZero={true}
            showValuesOnTopOfBars={false}
          />
          </View>

          {/* Graph niveau d'énergie  à l'entrainement / jour  */}
          <View style={styles.graph}>
          <Text style={styles.titleGraph}>Niveau d'énergie à l'entraînement</Text>
          <Text style={styles.dateGraph}>{currentDate}</Text>
          <BarChart
            data={TrainingEnergyDay}
            width={screenWidth}
            height={250}
            yAxisLabel=""
            chartConfig={chartConfigDay}
            verticalLabelRotation={0}
            fromZero={true}
            showValuesOnTopOfBars={false}
          />
          <View style={styles.description}>
          {injury ? <Text style={styles.descriptionGraph}>Blessure à l'entraînement : Oui </Text> : <Text style={styles.descriptionGraph}>Blessure à l'entraînement: Non</Text>}
          {trainingFatigue ? <Text style={styles.descriptionGraph}>Fatigue musculaire : Oui </Text> : <Text style={styles.descriptionGraph}>Fatigue musculaire : Non</Text>}
          {musclePain ? <Text style={styles.descriptionGraph}>Douleurs musculaires : Oui </Text> : <Text style={styles.descriptionGraph}>Douleurs musculaires: Non</Text>}
          </View>
          </View>
          {/* Stats Nutrition / jour  */}
          <View style={styles.graph}>
          <Text style={styles.titleGraph}>Nutrition</Text>
          <Text style={styles.dateGraph}>{currentDate}</Text>
          <View style={styles.descriptionNutrition}>
          {bloating ? <Text style={styles.descriptionGraph}>Ballonements : Oui </Text> : <Text style={styles.descriptionGraph}>Ballonements : Non</Text>}
          {intestinPain ? <Text style={styles.descriptionGraph}>Douleurs intestinales : Oui </Text> : <Text style={styles.descriptionGraph}>Douleurs intestinales : Non</Text>}
          {appetiteLack ? <Text style={styles.descriptionGraph}>Manque d'appétit : Oui </Text> : <Text style={styles.descriptionGraph}>Manque d'appétit : Non</Text>}
          {hungryFeel ? <Text style={styles.descriptionGraph}>Sensation de faim régulière : Oui </Text> : <Text style={styles.descriptionGraph}>Sensation de faim régulière  : Non</Text>}
          </View>
          </View>
        </View>
      </ScrollView>
      </View>
}
{periodWeek && statsWeek.length > 0 && (
        <View>
      <View style={styles.divBtn}>
      {statsWeekPrev.length > 0 && (
      <TouchableOpacity onPress={() => semainePrécédente()} style={styles.btnPeriod}>
        <Text style={styles.btnText}>Semaine précédente</Text>
      </TouchableOpacity>
      )}
      {statsWeekNext.length > 0 && (
  <TouchableOpacity 
    onPress={() => semaineSuivante()} 
    style={styles.btnPeriod}
  >
    <Text style={styles.btnText}>Semaine Suivante</Text>
  </TouchableOpacity>
)} 
      </View>
      <ScrollView >
        <View style={styles.graphContainer}>
          {/* Graph niveau d'hydratation / semaine  */}
          <View style={styles.graph}>
          <Text style={styles.titleGraph}>Hydratation</Text>
          <Text style={styles.dateGraph}> Semaine du : {currentDate}</Text>
          <LineChart
            data={HydrateWeek}
            width={screenWidth}
            height={250}
            yAxisLabel=""
            chartConfig={chartConfigWeek}
            verticalLabelRotation={30}
            fromZero={true}
            showValuesOnTopOfBars={false}
            onDataPointClick={({ index }) => handleDataPointClick(index)}
          />
          <View style={styles.divLabel}>
  <Text style={styles.clickedDay}>{clickedDay ? `Quantité bue ${clickedDay} : ${valueClickedDay} cL ` : 'Veuillez cliquer sur un point pour connaitre le jour concerné.'}</Text>
</View>
<View style={styles.descriptionNutrition}>
          {isThirstyWeek.length <= 2 && isThirstyWeek.length > 0 ? <Text style={styles.descriptionGraph}>Sensation de soif : Jamais ou rarement</Text> : 
          isThirstyWeek.length >= 3 && isThirstyWeek.length < 5 ? <Text style={styles.descriptionGraph}>Sensation de soif : Fréquent </Text> :
          isThirstyWeek.length >= 5 ? <Text style={styles.descriptionGraph}>Sensation de soif : Très fréquent </Text> : null}
         </View>
         </View>

         {/* Graph niveau d'énergie / semaine  */}
         <View style={styles.graph}>
          <Text style={styles.titleGraph}>Niveau d'énergie</Text>
          <Text style={styles.dateGraph}> Semaine du : {currentDate}</Text>
          <LineChart
            data={EnergyWeek}
            width={screenWidth}
            height={250}
            yAxisLabel=""
            chartConfig={chartConfigWeek}
            verticalLabelRotation={30}
            fromZero={true}
            showValuesOnTopOfBars={false}
            onDataPointClick={({ index }) => handleDataPointClick(index)}
          />
          <View style={styles.divLabel}>
  <Text style={styles.clickedDay}>{clickedDay ? `Quantité bue ${clickedDay} : ${valueClickedDay} cL ` : 'Veuillez cliquer sur un point pour connaitre le jour concerné.'}</Text>
</View>

         </View>

          {/* Graph niveau de sommeil / semaine  */}
          <View style={styles.graph}>
          <Text style={styles.titleGraph}>Qualité du sommeil</Text>
          <Text style={styles.dateGraph}> Semaine du : {currentDate}</Text>
          <LineChart
            data={SleepWeek}
            width={screenWidth}
            height={250}
            yAxisLabel=""
            chartConfig={chartConfigWeek}
            verticalLabelRotation={30}
            fromZero={true}
            showValuesOnTopOfBars={false}
            onDataPointClick={({ index }) => handleDataPointClick(index)}
          />
          <View style={styles.divLabel}>
  <Text style={styles.clickedDay}>{clickedDay ? `Quantité bue ${clickedDay} : ${valueClickedDay} cL ` : 'Veuillez cliquer sur un point pour connaitre le jour concerné.'}</Text>
</View>
<View style={styles.descriptionNutrition}>
          {NightWakeUpWeek.length <= 2 && NightWakeUpWeek.length > 0 ? <Text style={styles.descriptionGraph}>Réveils nocturnes : Jamais ou rarement</Text> : 
         NightWakeUpWeek.length >= 3 && NightWakeUpWeek.length < 5 ? <Text style={styles.descriptionGraph}>Réveils nocturnes : Fréquent </Text> :
         NightWakeUpWeek.length >= 5 ? <Text style={styles.descriptionGraph}>Réveils nocturnes : Très fréquent </Text> : null}
          {NoSleepWeek.length <= 2 && NoSleepWeek.length> 0 ? <Text style={styles.descriptionGraph}>Insomnies : Jamais ou rarement</Text> : 
          NoSleepWeek.length >= 3 && NoSleepWeek.length < 5 ? <Text style={styles.descriptionGraph}>Insomnies : Fréquentes </Text> :
          NoSleepWeek.length >= 5 ? <Text style={styles.descriptionGraph}>Insomnies: Très fréquentes </Text> : null}
          {morningFatigueWeek.length <= 2 && morningFatigueWeek.length  > 0 ? <Text style={styles.descriptionGraph}>Fatigue matinale : Jamais ou rarement</Text> : 
          morningFatigueWeek.length  >= 3 && morningFatigueWeek.length  < 5 ? <Text style={styles.descriptionGraph}>Fatigue matinale: Fréquente </Text> :
          morningFatigueWeek.length  >= 5 ? <Text style={styles.descriptionGraph}>Fatigue matinale : Très fréquente </Text> : null}
         </View>
         </View>

          {/* Graph niveau de motivation / semaine  */}
          <View style={styles.graph}>
          <Text style={styles.titleGraph}>Niveau de motivation à l'entraînement</Text>
          <Text style={styles.dateGraph}> Semaine du : {currentDate}</Text>
          <LineChart
            data={MotivationWeek}
            width={screenWidth}
            height={250}
            yAxisLabel=""
            chartConfig={chartConfigWeek}
            verticalLabelRotation={30}
            fromZero={true}
            showValuesOnTopOfBars={false}
            onDataPointClick={({ index }) => handleDataPointClick(index)}
          />
          <View style={styles.divLabel}>
  <Text style={styles.clickedDay}>{clickedDay ? `Quantité bue ${clickedDay} : ${valueClickedDay} cL ` : 'Veuillez cliquer sur un point pour connaitre le jour concerné.'}</Text>
</View>
         </View>

          {/* Graph niveau entrainement / semaine  */}
          <View style={styles.graph}>
          <Text style={styles.titleGraph}>Niveau d'énergie à l'entraînement</Text>
          <Text style={styles.dateGraph}> Semaine du : {currentDate}</Text>
          <LineChart
            data={TrainingWeek}
            width={screenWidth}
            height={250}
            yAxisLabel=""
            chartConfig={chartConfigWeek}
            verticalLabelRotation={30}
            fromZero={true}
            showValuesOnTopOfBars={false}
            onDataPointClick={({ index }) => handleDataPointClick(index)}
          />
          <View style={styles.divLabel}>
  <Text style={styles.clickedDay}>{clickedDay ? `Quantité bue ${clickedDay} : ${valueClickedDay} cL ` : 'Veuillez cliquer sur un point pour connaitre le jour concerné.'}</Text>
</View>
<View style={styles.descriptionNutrition}>
          {trainingInjuryWeek.length <= 2 && trainingInjuryWeek.length > 0 ? <Text style={styles.descriptionGraph}>Blessure à l'entrainement : Jamais ou rarement</Text> : 
         trainingInjuryWeek.length >= 3 && trainingInjuryWeek.length < 5 ? <Text style={styles.descriptionGraph}>Blessure à l'entrainement : Fréquente </Text> :
         trainingInjuryWeek.length >= 5 ? <Text style={styles.descriptionGraph}>Blessure à l'entrainement : Très fréquentes </Text> : null}
          {trainingFatigueWeek.length <= 2 && trainingFatigueWeek.length> 0 ? <Text style={styles.descriptionGraph}>Fatigue à l'entrainement : Jamais ou rarement</Text> : 
          trainingFatigueWeek.length >= 3 && trainingFatigueWeek.length < 5 ? <Text style={styles.descriptionGraph}>Fatigue à l'entrainement : Fréquente </Text> :
          trainingFatigueWeek.length >= 5 ? <Text style={styles.descriptionGraph}>Fatigue à l'entrainement: Très fréquente</Text> : null}
          {musclePainWeek.length <= 2 && musclePainWeek.length  > 0 ? <Text style={styles.descriptionGraph}>Douleurs musculaires : Jamais ou rarement</Text> : 
          musclePainWeek.length  >= 3 && musclePainWeek.length  < 5 ? <Text style={styles.descriptionGraph}>Douleurs musculaires: Fréquentes </Text> :
          musclePainWeek.length  >= 5 ? <Text style={styles.descriptionGraph}>Douleurs musculaires : Très fréquente </Text> : null}
         </View>
         </View>

          {/* Stats nutrition / semaine  */}
          <View style={styles.graph}>
          <Text style={styles.titleGraph}>Nutrition</Text>
          <Text style={styles.dateGraph}> Semaine du : {currentDate}</Text>
          
<View style={styles.descriptionNutrition}>
          {bloatingWeek.length <= 2 && bloatingWeek.length > 0 ? <Text style={styles.descriptionGraph}>Ballonements : Jamais ou rarement</Text> : 
         bloatingWeek.length >= 3 && bloatingWeek.length < 5 ? <Text style={styles.descriptionGraph}>Ballonements : Fréquents </Text> :
         bloatingWeek.length >= 5 ? <Text style={styles.descriptionGraph}>Ballonements : Très fréquents </Text> : null}
          {appetitLackWeek.length <= 2 && appetitLackWeek.length> 0 ? <Text style={styles.descriptionGraph}>Manque d'appétit : Jamais ou rarement</Text> : 
          appetitLackWeek.length >= 3 && appetitLackWeek.length < 5 ? <Text style={styles.descriptionGraph}>Manque d'appétit  : Fréquent </Text> :
          appetitLackWeek.length >= 5 ? <Text style={styles.descriptionGraph}>Manque d'appétit : Très fréquent</Text> : null}
          {hungryFeelWeek.length <= 2 && hungryFeelWeek.length  > 0 ? <Text style={styles.descriptionGraph}>Sensation de faim régulière : Jamais ou rarement</Text> : 
          hungryFeelWeek.length  >= 3 && hungryFeelWeek.length  < 5 ? <Text style={styles.descriptionGraph}>Sensation de faim régulière: Fréquente </Text> :
          hungryFeelWeek.length  >= 5 ? <Text style={styles.descriptionGraph}>Sensation de faim régulière : Très fréquente </Text> : null}
          {intestinPainWeek.length <= 2 && intestinPainWeek.length  > 0 ? <Text style={styles.descriptionGraph}>Douleurs intestinales : Jamais ou rarement</Text> : 
          intestinPainWeek.length  >= 3 && intestinPainWeek.length  < 5 ? <Text style={styles.descriptionGraph}>Douleurs intestinales: Fréquentes </Text> :
          intestinPainWeek.length  >= 5 ? <Text style={styles.descriptionGraph}>Douleurs intestinales : Très fréquentes </Text> : null}
         </View>
         </View>
        </View>
      </ScrollView>
     
      </View>
      )}
        <View style={styles.divBtn}>
      {statsWeekPrev.length > 0 && (
      <TouchableOpacity onPress={() => semainePrécédente()} style={styles.btnPeriod}>
        <Text style={styles.btnText}>Semaine précédente</Text>
      </TouchableOpacity>
      )}
      {statsWeekNext.length > 0 && (
  <TouchableOpacity 
    onPress={() => semaineSuivante()} 
    style={styles.btnPeriod}
  >
    <Text style={styles.btnText}>Semaine Suivante</Text>
  </TouchableOpacity>
)} 
      </View>
      <Text style={styles.dateGraph}>{date ? `Date : ${moment(date).format('DD/MM/YYYY')}` : 'Aucune statistique disponible pour la date actuelle.'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FEFAF7',
  },
  titlePage: {
    marginTop: 60,
    fontSize: 28,
    color: '#E76F51'
  },
  inputPeriod: {
    marginTop: 20,
    fontSize: 20,
    color: '#E76F51'
  },
  divBtn:{
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop:20,
  },
  graphContainer: {
    marginTop: 10,
    width: '95%',
    minHeight: 2600,
    backgroundColor: '#FEFAF7',
    borderRadius: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  graph: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#FEFAF7',
    borderRadius: 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  description: {
    width: '100%',
   marginLeft:20,
   justifyContent:'flex-start',
   alignItems:'flex-start',
    textAlign: 'justify',
    fontSize: 16,
    color: '#264653',
    marginTop: 10,
  },

  descriptionNutrition: {
    width: '100%',
   marginLeft:20,
   justifyContent:'flex-start',
   alignItems:'flex-start',
    textAlign: 'justify',
    fontSize: 16,
    color: '#264653',
    marginTop: 40,
  },
  
  titleGraph: {
    marginTop: 0,
    marginBottom: 20,
    marginLeft: 20,
    fontSize: 20,
    color: '#E76F51'
  },
  btnPeriod:{
    backgroundColor: '#264653',
    color:'white',
    borderRadius: 30,
    borderWidth: 1,
    padding: 10,
    marginBottom:30,
    marginLeft:20,
    minWidth:135,
    minHeight:40,
    alignItems:'center',
    justifyContent:'center',
  },
  btnText:{
    color:'white',
    fontSize:16,
    padding:'auto',
  },
  descriptionGraph: {
    width:'100%',
    textAlign: 'left',
    fontSize: 16,
    color: '#264653'
  },
  descriptionGraph: {
    width:'100%',
    textAlign: 'left',
    fontSize: 16,
    color: '#264653'
  },
  dateGraph: {
    width:'100%',
    textAlign: 'center',
    fontSize: 16,
    color: '#264653'
  },
  astuce:{
    marginTop:20,
    marginBottom:20,
    fontSize:16,
    color:'#E76F51'
  },
  dropdown: {
    marginTop: 20,
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  inputSearchStyle:{
    display:'none',
  },
  divLabel: {
    marginTop: -20,
    marginLeft:10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clickedDay: {
    fontSize: 14,
    color: '#E76F51',
    textAlign: 'center',
  },
})

