"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentDetails_model = exports.StudentSubject_model = exports.Students_model = exports.Subject_model = exports.User_model = exports.seq = void 0;
const sequelize_1 = require("sequelize");
exports.seq = new sequelize_1.Sequelize("postgres", "postgres", "admin", {
    host: "localhost",
    dialect: "postgres",
});
exports.User_model = exports.seq.define("users", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    datecreated: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    datemodified: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    secret_key: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});
exports.Subject_model = exports.seq.define("subjects", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});
exports.Students_model = exports.seq.define("students", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    middlename: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });
exports.StudentSubject_model = exports.seq.define('student_subjects', {
    // selfGranted: DataTypes.BOOLEAN,
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    // student_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Students_model,
    //     key: 'id'
    //   }
    // },
    // subject_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Subject_model,
    //     key: 'id'
    //   }
    // },
    marks: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    grade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, { timestamps: false });
exports.Students_model.belongsToMany(exports.Subject_model, { through: exports.StudentSubject_model });
exports.Subject_model.belongsToMany(exports.Students_model, { through: exports.StudentSubject_model });
exports.StudentDetails_model = exports.seq.define('get_student_details_by', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subject_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    subject_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    marks: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});
//# sourceMappingURL=models.js.map