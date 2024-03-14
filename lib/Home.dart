import 'package:flutter/material.dart';
import 'package:ledgerapp/category.dart';
import 'package:ledgerapp/customers.dart';
// import 'package:flutter_application_commedia/Login.dart';
// import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:ledgerapp/login.dart';

void main() {
  runApp(FlutterApp());
}

class FlutterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "FlutterApp",
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.orange),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  ////BODY//
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
          title: Text(
            "Home",
            style: TextStyle(color: Colors.white),
          ),
          automaticallyImplyLeading: false,
          elevation: 10,
          backgroundColor: Color.fromARGB(255, 201, 14, 0)),
      body: Container(
        color: Colors.white,

        //Header//

        //Company Logo//
        child: Column(
          children: [
            Row(
              children: [
                //commedia logo section//
                Padding(
                  padding: EdgeInsets.only(top: 30, bottom: 0, left: 20),
                  child: SizedBox(
                    width: 230,
                    height: 60,
                    child: Image.asset('assets/Images/annapurnanew.png',
                        fit: BoxFit.fill),
                  ),
                ),

                SizedBox(
                  width: 20,
                ),

                //Log-Out Button//
                Padding(
                  padding: EdgeInsets.only(top: 30, bottom: 0, left: 70),
                  child: InkWell(
                    onTap: () async {
                      // final SharedPreferences prefs =
                      //     await SharedPreferences.getInstance();
                      // prefs.remove('accessToken');

                      Navigator.push(context,
                          MaterialPageRoute(builder: (context) => Loginpage()));
                    },
                    child: SizedBox(
                      width: 50,
                      height: 50,
                      child: CircleAvatar(
                          backgroundColor: Color.fromARGB(255, 201, 14, 0),
                          child: Image.asset('assets/Images/womenicon.png')),
                    ),
                  ),
                ),
              ],
            ),

            // TOOL Section //
            SingleChildScrollView(
              scrollDirection: Axis.vertical,
              child: InkWell(
                onTap: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => CustomersScreen()));
                },
                child: Container(
                  margin: EdgeInsets.only(top: 90),
                  width: 360,
                  height: 220,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    border: Border.all(
                      width: 3,
                      color: Color.fromARGB(255, 201, 14, 0),
                    ),
                  ),

                  //Elements inside TOOL Container//
                  child: Row(children: [
                    Padding(
                      padding: EdgeInsets.only(left: 0, top: 4, bottom: 4),
                      child: SizedBox(
                          width: 220,
                          height: 240,
                          child: Image.asset("assets/Images/food.png")),
                    ),
                    SizedBox(
                      width: 5,
                    ),
                    Padding(
                      padding: EdgeInsets.only(left: 20),
                      child: InkWell(
                        child: Container(
                          child: Text(
                            "Entry",
                            style: TextStyle(
                                fontSize: 30,
                                fontWeight: FontWeight.w700,
                                color: Color(0xffff7400)),
                          ),
                        ),
                      ),
                    ),
                  ]),
                ),
              ),
            ),

            // ANALYTICS section //
            InkWell(
              onTap: () {
                // Navigator.push(context,
                //     MaterialPageRoute(builder: (context) => Statspage()));
              },
              child: Container(
                margin: EdgeInsets.only(top: 40),
                width: 360,
                height: 220,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(30),
                    border: Border.all(
                      width: 3,
                      color: Color.fromARGB(255, 201, 14, 0),
                    )),

                //Elements inside analytics Container//
                child: Row(children: [
                  Padding(
                    padding: EdgeInsets.only(left: 0, top: 4, bottom: 4),
                    child: SizedBox(
                        width: 220,
                        height: 240,
                        child: Image.asset("assets/Images/stat.png")),
                  ),
                  Padding(
                    padding: EdgeInsets.only(left: 1),
                    child: Container(
                      child: Text(
                        "Analytics",
                        style: TextStyle(
                            fontSize: 30,
                            fontWeight: FontWeight.w700,
                            color: Color(0xffff7400)),
                      ),
                    ),
                  ),
                ]),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
