import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import DropdownComponent from '../../../components/dropdown';
import SaveButton from '../../../components/SaveButton';
import CancelButton from '../../../components/CancelButton';
import InputContainer from '../../../components/InputComponent';
import InputSpinner from "react-native-input-spinner";
import CurrencyInput from 'react-native-currency-input';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de instalar expo/vector-icons

const RegistrarGastoScreen = () => {
  const [nombre, setNombre] = useState<string>(''); 
  const [monto, setMonto] = useState<number>(1000); 
  const [descripcion, setDescripcion] = useState<string>(''); 
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>(''); 
  const [particion1Seleccionada, setParticion1Seleccionada] = useState<number>(50); 
  const [particion2Seleccionada, setParticion2Seleccionada] = useState<number>(50); 
  const [errors, setErrors] = useState<string>(''); 
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const categorias = ['Indumentaria', 'Educación', 'Salud', 'Recreación'];

  const validateInput = () => {
    setErrors('');
    if (!nombre) {
      setErrors('El nombre es requerido');
      return false;
    }
    if (!monto) {
      setErrors('El monto es requerido');
      return false;
    }
    if (isNaN(monto)) {
      setErrors('El monto debería ser un número');
      return false;
    }
    if (!categoriaSeleccionada) {
      setErrors('No se seleccionó una categoría');
      return false;
    }
    if (!particion1Seleccionada) {
      setErrors('No se indicó la partición');
      return false;
    }
    if (!particion2Seleccionada) {
      setErrors('No se indicó la partición');
      return false;
    }
    if (!selectedImage) { // Validación para la imagen
      setErrors('Se requiere adjuntar un comprobante de compra');
      return false;
    }
    return true;
  };

  const crearGasto = () => {
    if (!validateInput()) {
      return;
    }
    console.log('Creando gasto', { 
      nombre, 
      monto, 
      descripcion, 
      categoriaSeleccionada, 
      particion1Seleccionada, 
      particion2Seleccionada, 
      selectedImage, // Incluir la imagen en el registro
    });
    
    setNombre('');
    setMonto(0);
    setDescripcion('');
    setCategoriaSeleccionada('');
    setParticion1Seleccionada(50);
    setParticion2Seleccionada(50); 
    setSelectedImage(null); // Resetear imagen al guardar
  };

  const noGuardarGasto = () => {
    router.back();
  };

  const handleParticionChange = (value: number) => {
    setParticion1Seleccionada(value);
    setParticion2Seleccionada(100 - value);
  };

  const handleParticion2Change = (num: number) => {
    setParticion2Seleccionada(num);
    setParticion1Seleccionada(100 - num);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requiere permiso para acceder a la galería');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Guarda la URI de la imagen seleccionada
    }
  };

  return (
    <View style={styles.container}>
      <InputContainer label="Nombre del gasto" value={nombre} setFunction={setNombre} />

      <Text style={styles.label}>Categoría</Text>
      <View style={{ paddingBottom: 15 }}>
        <DropdownComponent title="Categoría" labels={categorias} onSelect={setCategoriaSeleccionada} />
      </View>
      <InputContainer label="Descripción" value={descripcion} setFunction={setDescripcion} />

      <Text style={styles.label}>Monto: </Text>
      <CurrencyInput
        value={monto}
        onChangeValue={(value) => setMonto(value ?? 0)} // Handle the null case
        prefix="$"
        delimiter=","
        precision={0}
        minValue={0}
        style={styles.currencyInput}
      />

      {/* Particiones individuales */}
      <View style={styles.particiones}>
        <View style={styles.grupoParticionIndividual}>
          <Text style={styles.labelParticion}>Vos %: </Text>
          <InputSpinner
            max={100}
            min={0}
            step={10}
            skin='round'
            style={styles.spinner}
            value={particion1Seleccionada}
            onChange={(num: number) => handleParticionChange(num)}
            color='#cccccc'
          />
          <Text style={styles.pagarLabel}>Pagarás: </Text>
          <Text style={styles.pagarValue}>${particion1Seleccionada * monto / 100}</Text>
        </View>

        <View style={styles.grupoParticionIndividual}>
          <Text style={styles.labelParticion}>Máximo %: </Text>
          <InputSpinner
            max={100}
            min={0}
            step={10}
            skin="round"
            value={particion2Seleccionada}
            onChange={(num: number) => handleParticion2Change(num)}
            color='#cccccc'
            style={styles.spinner}
          />
          <Text style={styles.pagarLabel}>Pagará: </Text>
          <Text style={styles.pagarValue}>${particion2Seleccionada * monto / 100}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <MaterialIcons name="attach-file" size={24} color="white" />
        <Text style={styles.uploadButtonText}>Adjuntar comprobante de Compra</Text>
      </TouchableOpacity>

      {selectedImage && (
        <Text style={styles.uploadSuccessText}>Comprobante adjuntado con éxito!</Text> // Mensaje de éxito
      )}
      
      <Text style={styles.error}>{errors}</Text>

      <View style={styles.buttonContainer}>
        <CancelButton texto="Cancelar" onPress={noGuardarGasto} />
        <SaveButton texto="Guardar" onPress={crearGasto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  particiones: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  grupoParticionIndividual: {
    paddingTop: 10,
    flexDirection: 'column',         
    alignItems: 'center',         
    marginBottom: 5,             
  },
  labelParticion: {
    fontSize: 14,                 
    fontWeight: 'bold',
    marginBottom: 5         
  },
  label: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginLeft: '10%',
    marginRight: 10,
  },
  currencyInput: {
    backgroundColor: 'white', 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 18, 
    padding: 10, 
    fontSize: 14, 
    marginBottom: 15, 
    marginHorizontal: 37,
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 150,
  },
  uploadButton: {
    flexDirection: 'row',
    verticalAlign: 'middle',
    alignItems: 'center',
    backgroundColor: '#3a87e7',
    padding: 10,
    borderRadius: 15,
    marginTop: 13,
    paddingHorizontal: 30,
  },
  uploadButtonText: {
    color: 'white',
    marginLeft: 10,
    alignItems: 'center',
  },
  uploadSuccessText: {
    color: '#586e26',
    fontSize: 15,
    fontWeight: 'heavy',
    textAlign: 'center',
  },
  pagarLabel: {
    marginTop: 10, 
  },
  pagarValue: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#555',
  },
});

export default RegistrarGastoScreen;