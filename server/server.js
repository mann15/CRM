import express from "express";
import cors from "cors";
import db from "./config/dbConfig.js";
import dotenv from "dotenv";
dotenv.config();
import route from "./routes/index.js";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();

const port = process.env.PORT;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 10,
  },
};

app.use(cors(corsOptions));

app.use(session(sessionOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.send("Server is up and running on port " + port);
});

// login route
app.use("/api/v1/auth", route.authRoute);

// -----Common-API-Routes-----
app.use("/api/v1/designation", route.designationRoute);
app.use("/api/v1/type", route.typeRoute);

// -----Other-API-Routes-----
app.use("/api/v1/other/city", route.cityRoute);
app.use("/api/v1/other/state", route.stateRoute);
app.use("/api/v1/other/country", route.countryRoute);
app.use("/api/v1/other/department", route.departmentRoute);
app.use("/api/v1/other/user", route.userRoute);

// -----University-API-Routes-----
app.use("/api/v1/university", route.universityRoute);
app.use("/api/v1/university/naac", route.uniNaacRoute);
app.use("/api/v1/university/nirf", route.uniNirfRoute);
app.use("/api/v1/university/employee", route.uniEmployeeRoute);
app.use("/api/v1/university/universityHasDepartment", route.uniHasDeptRoute);
app.use("/api/v1/university/universityCourse", route.uniCourseRoute);
app.use(
  "/api/v1/university/employeeHasDesignation",
  route.uniEmployeeHasDesignationRoute
);

// -----College-API-Routes-----
app.use("/api/v1/college", route.collegeRoute);
app.use("/api/v1/college/employee", route.clgEmployeeRoute);
app.use("/api/v1/college/collegeHasDepartment", route.clgHasDeptRoute);
app.use("/api/v1/college/collegeCourse", route.clgCourseRoute);
app.use(
  "/api/v1/college/employeeHasDesignation",
  route.clgEmployeeHasDesignationRoute
);

// -----Industry-API-Routes-----
app.use("/api/v1/industry", route.indRoute);
app.use("/api/v1/industry/company", route.indCmpRoute);
app.use("/api/v1/industry/location", route.indCmpLocRoute);
app.use("/api/v1/industry/name", route.indNameRoute);
app.use("/api/v1/industry/head_qt", route.indCmpHeadQtRoute);
app.use("/api/v1/industry/companyHasLocation", route.indCmpHasIndCmpLoc);
app.use("/api/v1/industry/companyHasDepartment", route.indCmpHasIndCmpDept);
app.use("/api/v1/industry/employeeHasDesignation", route.indEmpHasIndDes);
app.use("/api/v1/industry/employee", route.indEmp);

// Error catch configuration
app.all("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

// Error handling middleware
app.use(async (err, req, res, next) => {
  console.log(err);
  return res
    .status(500)
    .json({
      success: false,
      data: err,
      message: {
        name: err?.name,
        error: err.errors ? err?.errors[0].message : "Internal Server Error",
        associatedField: err.errors ? err.errors[0].path : "Not available",
        type: err.errors ? err.errors[0].type : "Not available",
      },
    });
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected successfully!!");
    app.listen(port, () => {
      console.log(`Server listening on port number ${port}.....`);
    });
  })
  .catch((err) => {
    console.log("Database Error : ", err);
  });
