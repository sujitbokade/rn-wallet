
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, Image, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../assets/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constant/colors";
import { useAuth } from "../../hooks/useAuth";

export default function Page() {
  const router = useRouter();
  const {login} = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

 const handleLogin = async() => {
  setIsLoading(true)
  try {
      const response = await fetch('http://localhost:3000/api/user/login',{
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({email, password})
      })

      const data = await response.json()
      console.log("🚀 ~ handleLogin ~ data:", data)
      if(data.success){
        Alert.alert('Login Successfully')
        login(data.userId, data.email)
      } else {
        setError(data.message)
      }
  } catch (error) {
    console.log("Login Failed",error)
  } finally{
    setIsLoading(false)
  }
 }
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
      keyboardShouldPersistTaps={'handled'}
    >
      <View style={styles.container}>
        <Image source={require("../../assets/images/revenue-i4.png")} style={styles.illustration} />
        <Text style={styles.title}>Welcome Back</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={email}
          placeholder="Enter email"
          placeholderTextColor="#9A8478"
          onChangeText={(emailAddress) => setEmail(emailAddress)}
        />

        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TouchableOpacity  style={styles.button} onPress={handleLogin}>
          {
            isLoading ? ( <ActivityIndicator size="small" color={COLORS.white} />): (
              <Text style={styles.buttonText}>Sign In</Text>
            )
          }
       
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>

          <Link href="/sign-up" asChild>
            <TouchableOpacity >
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}