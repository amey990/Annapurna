import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:ledgerapp/login.dart';
import 'firebase_options.dart';

// ...

// // void main() async {
// //   runApp(FlutterApp());
// // }

// void main() async {
//   WidgetsFlutterBinding.ensureInitialized();
//   await Firebase.initializeApp();
//   runApp(FlutterApp());
// }


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
);
   runApp(FlutterApp());
}


class FlutterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "FlutterApp",
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.orange),
      home: Loginpage(),
    );
  }
}

//

class DashBoardScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(""),
      ),
    );
  }
}
