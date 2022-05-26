import { Component, OnInit } from "@angular/core";
import { Services } from "../../../shared/model/data/Services.model";
import { UtilsServiceService } from "../../../utils-service.service";
import { ServiceService } from "../service.service";
import { isUndefined } from "lodash";
import { ServiceEntitie } from "../../../shared/model/data/ServiceEntitie.model";
@Component({
  selector: "ngx-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class TestComponent implements OnInit {
  constructor(
    private serviceManagementService: ServiceService,
    private utilsService: UtilsServiceService
  ) {}
  lineNumber: number = 1;
  lineNumbers: any[] = [];
  actionsServices: any[] = [];
  actionOperators: any[] = [];
  action2Operators: any[] = [];
  precondServices: any[] = [];
  precondOperators: any[] = [];
  selectedActionService = null;
  selectedPreCondService = null;
  selectedActionOperator = null;
  selectedPreCondOperator = null;

  allEntriesAction = [];
  allEntriesAction2 = [];
  allEntriesActionLineaire = [];
  allEntriesPrecond = [];
  lineRelations = [];
  lineRelationsLineaire = [];
  relationsbasique = [];
  relationsLineaire = [];
  relation: any = {
    enterType: "null",
    controlType: "null",
    nombreAction: "1",
    p: "LABEL",
  };
  listServices: ServiceEntitie[] = [];
  listServicesLineaire: any = [];
  listServicesConfigurable: any = [];
  listServicesConfigurableused: any = [];
  relationTabConfigurable: any = [];
  recetteTabConfigurable: any = [];
  configurable = false;
  recetteConfigurable = false;
  preferenceUtilisaturs = false;
  testentriesCong = true;
  preferences = [];
  checked = true;
  mappingOperators = [];
  resultConfig = false;
  resultConfigTab = [];
  finalResultConfigTab = [];
  mapUsedOperators = new Map();
  ngOnInit(): void {
    this.getAllServices();
    this.lineNumbers.push(this.lineNumber);
    this.mappingOperators = [
      { configOperator: "CAND", staticOperator: "" },
      { configOperator: "COR", staticOperator: "" },
      { configOperator: "CXOR", staticOperator: "" },
    ];
  }
  incrementLineNumber() {
    this.lineNumber++;
  }
  onChangeActionService(index, actiontwo: boolean) {
    console.log("index ", index, "  line number ", this.lineNumber);
    if (this.selectedActionService != null) {
      this.actionsServices.push(this.selectedActionService);
      if (actiontwo == true) {
        this.allEntriesAction2.push(this.selectedActionService);
      } else {
        this.allEntriesAction.push(this.selectedActionService);
      }
      this.allEntriesPrecond.push(null);
      this.lineNumber++;
      this.lineNumbers.push(this.lineNumber);
      this.selectedActionService = null;
      console.log("index ", index, "  line number ", this.lineNumber);
    }
  }

  onChangeActionOperator(actiontwo: boolean) {
    if (this.selectedActionOperator != null) {
      this.actionOperators.push(this.selectedActionOperator);
      if (actiontwo == true) {
        this.allEntriesAction2.push(this.selectedActionOperator);
      } else {
        this.allEntriesAction.push(this.selectedActionOperator);
      }
      this.allEntriesPrecond.push(null);

      this.lineNumber++;
      this.lineNumbers.push(this.lineNumber);
      this.selectedActionOperator = null;
    }
  }

  onChangePrecondService() {
    if (this.selectedPreCondService != null) {
      this.precondServices.push(this.selectedPreCondService);
      this.allEntriesAction.push(this.selectedPreCondService);
      if (this.lineNumber <= this.allEntriesPrecond.length) {
        this.lineNumber++;
        this.lineNumbers.push(this.lineNumber);
      }
      this.selectedPreCondService = null;
    }
  }

  onChangePrecondOperator() {
    if (this.selectedPreCondOperator != null) {
      this.precondOperators.push(this.selectedPreCondOperator);
      this.allEntriesPrecond.push(this.selectedPreCondOperator);

      if (this.lineNumber <= this.allEntriesPrecond.length) {
        this.lineNumber++;
        this.lineNumbers.push(this.lineNumber);
      }
      this.selectedPreCondOperator = null;
    }
  }

  Valider() {
    console.log("-----valider------");
    console.log("allEntriesAction", this.allEntriesAction);
    console.log("allEntriesAction2", this.allEntriesAction2);
    console.log("allEntriesPrecond", this.allEntriesPrecond);
    for (let elt of this.allEntriesAction) {
      if (!isUndefined(elt.serviceIsConfigurable)) {
        if (elt.serviceIsConfigurable == true) {
          this.configurable = true;
          break;
        }
      }
    }

    for (let elt of this.allEntriesPrecond) {
      if (elt != null) {
        if (!isUndefined(elt.serviceIsConfigurable)) {
          if (elt.serviceIsConfigurable == true) {
            this.configurable = true;
            break;
          }
        }
      }
    }
    for (let elt of this.allEntriesAction2) {
      if (!isUndefined(elt.serviceIsConfigurable)) {
        if (elt.serviceIsConfigurable == true) {
          this.configurable = true;
          break;
        }
      }
    }
    let entryAction = "";
    this.allEntriesAction.forEach((entry) => {
      if (typeof entry == "string") {
        entryAction = entryAction + " " + entry;
      } else if (entry.serviceIsConfigurable == true) {
        entryAction =
          entryAction + " " + "CEvaluate(" + entry.serviceName + ")";
      } else if (
        entry.serviceIsConfigurable == null ||
        entry.serviceIsConfigurable == false
      ) {
        entryAction = entryAction + " " + "Evaluate(" + entry.serviceName + ")";
      }
    });
    console.log("entry action ", entryAction);
    let entryAction2 = "";
    if (this.allEntriesAction2.length > 0) {
      this.allEntriesAction2.forEach((entry) => {
        if (typeof entry == "string") {
          entryAction2 = entryAction2 + " " + entry;
        } else if (entry.serviceIsConfigurable == true) {
          entryAction2 =
            entryAction2 + " " + "CEvaluate(" + entry.serviceName + ")";
        } else if (
          entry.serviceIsConfigurable == null ||
          entry.serviceIsConfigurable == false
        ) {
          entryAction2 =
            entryAction2 + " " + "Evaluate(" + entry.serviceName + ")";
        }
      });
    }
    let precondAction = "";
    this.allEntriesPrecond.forEach((entry) => {
      if (entry != null) {
        if (typeof entry == "string") {
          precondAction = precondAction + " " + entry;
        } else if (entry.serviceIsConfigurable == true) {
          precondAction =
            precondAction + " " + "CEvaluate(" + entry.serviceName + ")";
        } else if (
          entry.serviceIsConfigurable == null ||
          entry.serviceIsConfigurable == false
        ) {
          precondAction =
            precondAction + " " + "Evaluate(" + entry.serviceName + ")";
        }
      }
    });
    let relation;
    let type;
    let newElt;
    if (this.relation.enterType === "RELATION") {
      if (this.configurable == true) {
        type = "CTR";
        this.configurable = false;
      } else {
        type = "TR";
      }
    } else {
      if (this.configurable == true) {
        type = "CR";
        this.configurable = false;
      } else {
        type = "R";
      }
    }

    if (this.allEntriesAction2.length > 0) {
      const operator =
        this.relation.controlType === "CONTROLE"
          ? " PRECOND "
          : this.relation.controlType === "SUPPORT" ||
            this.relation.controlType === "REFINE/SUBSUME" ||
            this.relation.controlType === "CONDITIONEL"
          ? " IF "
          : this.relation.controlType === "DRIVE"
          ? " INPUT( "
          : "";
      //cette partie sera ajoutée uniquement pour fermer les parenthéses pour les relations de type Drive
      const extraElement = this.relation.controlType === "DRIVE" ? ")" : "";
      newElt = type + (this.relationsbasique.length + 1).toString();
      relation =
        type +
        (this.relationsbasique.length + 1).toString() +
        "=" +
        entryAction +
        "," +
        entryAction2 +
        operator +
        precondAction +
        extraElement;
    } else {
      newElt = type + (this.relationsbasique.length + 1).toString();
      const operator =
        this.relation.controlType === "CONTROLE"
          ? " PRECOND "
          : this.relation.controlType === "SUPPORT" ||
            this.relation.controlType === "REFINE/SUBSUME" ||
            this.relation.controlType === "CONDITIONEL"
          ? " IF "
          : this.relation.controlType === "DRIVE"
          ? " INPUT( "
          : "";
      console.log("operator is: ", operator);
      //cette partie sera ajoutée uniquement pour fermer les parenthéses pour les relations de type Drive
      const extraElement = this.relation.controlType === "DRIVE" ? ")" : "";
      if (this.relation.controlType === "REFINE/SUBSUME") {
        relation =
          type +
          (this.relationsbasique.length + 1).toString() +
          "=" +
          entryAction +
          operator +
          entryAction +
          " AND " +
          precondAction +
          extraElement;
      } else {
        relation =
          type +
          (this.relationsbasique.length + 1).toString() +
          "=" +
          entryAction +
          operator +
          precondAction +
          extraElement;
      }
    }
    console.log("------relation-----");
    console.log(relation);
    if (type == "CTR" || type == "CR")
      this.relationTabConfigurable.push(relation);
    this.lineRelations.push(relation);
    this.relationsbasique.push(relation);
    this.lineRelationsLineaire.push(newElt);
    this.initData();
  }
  verifier() {
    console.log("-----OK------");
  }
  deleteRelation(line, index) {
    console.log(line);

    if (
      this.relation.controlType == "LINEAIRE" ||
      this.relation.controlType == "CONDITIONEL"
    ) {
      var subStringss = line.split("=");
      console.log(subStringss);
      var i = 0;
      for (let elt of this.listServicesLineaire) {
        console.log(elt);
        if (typeof elt == "string") {
          if (elt == subStringss[0]) {
            console.log("fouuund");
            this.listServicesLineaire.splice(i, 1);
            break;
          }
        }
        i++;
      }
      console.log(this.listServicesLineaire);
    }
    this.lineRelations.splice(index, 1);
    this.relationsbasique.splice(index, 1);
  }

  getAllServices() {
    this.serviceManagementService.getAllServices().subscribe(
      (services: ServiceEntitie[]) => {
        this.listServicesLineaire = services;
        this.listServices = services;
        for (let serv of services) {
          if (serv.serviceIsConfigurable == true)
            this.listServicesConfigurable.push(serv);
        }
        console.log("conf serv", this.listServicesConfigurable);
      },
      (error) => {
        this.utilsService.showToast(
          "danger",
          `Erreur interne`,
          `Une erreur interne s'est produite lors du chargement de la liste des configurations.`
        );
      }
    );
  }
  initData() {
    this.lineNumber = 1;
    this.lineNumbers = [];
    this.actionsServices = [];
    this.actionOperators = [];
    this.precondServices = [];
    this.precondOperators = [];
    this.allEntriesAction = [];
    this.allEntriesAction2 = [];
    this.allEntriesActionLineaire = [];
    this.allEntriesPrecond = [];
    this.selectedActionService = null;
    this.selectedPreCondService = null;
    this.selectedActionOperator = null;
    this.selectedPreCondOperator = null;
    this.lineNumbers.push(this.lineNumber);
  }
  changeControleType(relation_controlType) {
    console.log(relation_controlType);
    this.relation.nombreAction = "1";
    if (
      (relation_controlType == "LINEAIRE" ||
        relation_controlType == "CONDITIONEL") &&
      this.lineRelationsLineaire.length > 0
    ) {
      this.listServicesLineaire = [];
      for (let service of this.listServices)
        this.listServicesLineaire.push(service);
      console.log(this.lineRelationsLineaire);
      for (let line of this.lineRelationsLineaire) {
        this.listServicesLineaire.push(line);
      }
      console.log(this.listServicesLineaire);
    }
  }
  isString(val): boolean {
    return typeof val === "string";
  }
  onChangeActionlineaireService(index) {
    console.log("index ", index, "  line number ", this.lineNumber);
    console.log(this.selectedActionService);
    console.log(this.allEntriesActionLineaire[index]);

    if (this.selectedActionService != null) {
      this.allEntriesActionLineaire.push(this.selectedActionService);

      this.lineNumber++;
      this.lineNumbers.push(this.lineNumber);
      this.selectedActionService = null;
      console.log("index ", index, "  line number ", this.lineNumber);
    }
    this.recetteConfigurable = false;
    for (let recette of this.allEntriesActionLineaire) {
      if (typeof recette == "string") {
        if (recette.charAt(0) == "C") {
          this.recetteConfigurable = true;
        }
      } else if (recette.serviceIsConfigurable == true) {
        this.recetteConfigurable = true;
      }
    }
  }
  ValiderLineaire() {
    if (this.relation.enterType === "RELATION") {
      console.log(this.allEntriesActionLineaire);
      for (let elt of this.allEntriesActionLineaire) {
        if (!isUndefined(elt.serviceIsConfigurable)) {
          if (elt.serviceIsConfigurable == true) {
            this.configurable = true;
            break;
          }
        }
      }
      let entryAction = "";
      if (this.relation.controlType === "EXTEND") {
        entryAction = "[";
      } else if (this.relation.controlType === "CONTEST/INTERFER") {
        entryAction = "CEvaluate( CFilter (";
      }

      if (this.relation.controlType === "EXTEND") {
        this.allEntriesActionLineaire.forEach((entry) => {
          entryAction = entryAction + entry.serviceName + " , ";
          /*if (typeof entry == "string") {
            entryAction = entryAction + " " + entry;
          } else if (entry.serviceIsConfigurable == true) {
            entryAction =
              entryAction + " " + "CEvaluate(" + entry.serviceName + ")";
          } else if (
            entry.serviceIsConfigurable == null ||
            entry.serviceIsConfigurable == false
          ) {
            entryAction =
              entryAction + " " + "Evaluate(" + entry.serviceName + ")";
          }*/
        });

        entryAction = entryAction + "]";
        entryAction = entryAction.replace(", ]", "]");
      } else if (this.relation.controlType === "CONTEST/INTERFER") {
        let filterEntries = "";
        let services = " ( ";
        for (let i = 0; i < this.allEntriesActionLineaire.length; i++) {
          let entry = this.allEntriesActionLineaire[i];
          if (this.relation.p === "LABEL") {
            filterEntries =
              filterEntries +
              "( Name," +
              entry.serviceName +
              " )" +
              (i != this.allEntriesActionLineaire.length - 1
                ? this.selectedPreCondOperator
                : "");
          }
          if (this.relation.p === "TYPE") {
            filterEntries =
              filterEntries +
              "( Type," +
              entry.serviceType +
              " )" +
              (i != this.allEntriesActionLineaire.length - 1
                ? this.selectedPreCondOperator
                : "");
          }
          if (this.relation.p === "CATEGORY") {
            filterEntries =
              filterEntries +
              "( Category," +
              entry.entitie.entitieCategory +
              ") " +
              (i != this.allEntriesActionLineaire.length - 1
                ? this.selectedPreCondOperator
                : "");
          }
          if (this.relation.p === "OWNER") {
            filterEntries =
              filterEntries +
              "( Owner," +
              entry.entitie.entitieOwner +
              ") " +
              (i != this.allEntriesActionLineaire.length - 1
                ? this.selectedPreCondOperator
                : "");
          }
          if (this.relation.p === "VENDOR") {
            filterEntries =
              filterEntries +
              "( Vendor," +
              entry.entitie.entitieVendor +
              ") " +
              (i != this.allEntriesActionLineaire.length - 1
                ? this.selectedPreCondOperator
                : "");
          }
          services = services + entry.serviceName + " , ";
          /*if (typeof entry == "string") {
            entryAction = entryAction + " " + entry;
          } else if (entry.serviceIsConfigurable == true) {
            entryAction =
              entryAction + " " + "CEvaluate(" + entry.serviceName + ")";
          } else if (
            entry.serviceIsConfigurable == null ||
            entry.serviceIsConfigurable == false
          ) {
            entryAction =
              entryAction + " " + "Evaluate(" + entry.serviceName + ")";
          }*/
        }
        services = services.substring(0, services.length - 2);
        entryAction = entryAction + filterEntries + services + " ) " + " ) )";
      }

      console.log("entry action ", entryAction);
      let relation;
      let type;
      let newElt;
      if (this.configurable == true) {
        type = "CTR";
        this.configurable = false;
      } else {
        type = "TR";
      }
      newElt = type + (this.relationsbasique.length + 1).toString();
      relation =
        type +
        (this.relationsbasique.length + 1).toString() +
        "=" +
        (this.relation.controlType === "EXTEND" ? "Ts_extend " : "") +
        entryAction;
      console.log("------relation-----");
      console.log(relation);
      if (type == "CTR") this.relationTabConfigurable.push(relation);
      this.lineRelations.push(relation);
      this.relationsbasique.push(relation);
      this.lineRelationsLineaire.push(newElt);
      this.initData();
    } else {
      console.log(this.selectedPreCondOperator);
      this.allEntriesActionLineaire.push(this.selectedPreCondOperator);
      console.log(this.allEntriesActionLineaire);

      let entryAction = "";
      let operator =
        this.allEntriesActionLineaire[this.allEntriesActionLineaire.length - 1];
      this.allEntriesActionLineaire.length =
        this.allEntriesActionLineaire.length - 1;
      console.log(this.allEntriesActionLineaire);

      this.allEntriesActionLineaire.forEach((entry) => {
        if (entryAction == "") {
          if (typeof entry == "string") {
            if (entry.startsWith("CTR") || entry.startsWith("CR")) {
              entryAction = " CEvaluate(" + entry + ") ";
            } else {
              entryAction = entry;
            }
          } else if (entry.serviceIsConfigurable == true) {
            entryAction = " CEvaluate(" + entry.serviceName + ") ";
          } else if (entry.serviceIsConfigurable == false) {
            entryAction = " Evaluate(" + entry.serviceName + ") ";
          }
        } else {
          if (typeof entry == "string") {
            if (entry.startsWith("CTR") || entry.startsWith("CR")) {
              entryAction =
                entryAction + " " + operator + " CEvaluate(" + entry + ") ";
            } else {
              entryAction =
                entryAction +
                " " +
                operator +
                " " +
                " Evaluate(" +
                entry +
                ") ";
            }
          } else if (entry.serviceIsConfigurable == true) {
            entryAction =
              entryAction +
              " " +
              operator +
              " CEvaluate(" +
              entry.serviceName +
              ") ";
          } else if (entry.serviceIsConfigurable == false) {
            entryAction =
              entryAction +
              " " +
              operator +
              " " +
              " Evaluate(" +
              entry.serviceName +
              ") ";
          }
        }
      });

      let recette;
      if (this.recetteConfigurable == true) {
        recette =
          "CR" +
          (this.relationsLineaire.length + 1).toString() +
          "=" +
          entryAction;

        this.recetteTabConfigurable.push(recette);
        this.recetteConfigurable = false;
      } else {
        recette =
          "R" +
          (this.relationsLineaire.length + 1).toString() +
          "=" +
          entryAction;
      }

      console.log("------recette-----");
      console.log(recette);
      this.lineRelations.push(recette);
      this.relationsLineaire.push(recette);
      this.initData();
    }
  }
  nextPage() {
    // chercher les opérateurs pour chaque chasue relation
    this.relationTabConfigurable.forEach((el) => {
      if (!el.includes("=Ts_extend")) {
        let listOperators = [];
        if (el.includes("CAND")) {
          listOperators.push({ configOperator: "CAND", staticOperator: "" });
        }
        if (el.includes("COR")) {
          listOperators.push({ configOperator: "COR", staticOperator: "" });
        }
        if (el.includes("CXOR")) {
          listOperators.push({ configOperator: "CXOR", staticOperator: "" });
        }
        if (el.includes(",")) {
          listOperators.push({ configOperator: ",", staticOperator: "" });
        }
        this.mapUsedOperators.set(el, listOperators);
      }
    });

    this.recetteTabConfigurable.forEach((el) => {
      let listOperators = [];
      if (el.includes("CAND")) {
        listOperators.push({ configOperator: "CAND", staticOperator: "" });
      }
      if (el.includes("COR")) {
        listOperators.push({ configOperator: "COR", staticOperator: "" });
      }
      if (el.includes("CXOR")) {
        listOperators.push({ configOperator: "CXOR", staticOperator: "" });
      }
      if (el.includes(",")) {
        listOperators.push({ configOperator: ",", staticOperator: "" });
      }
      this.mapUsedOperators.set(el, listOperators);
    });

    console.log("services", this.listServicesConfigurable);
    this.listServicesConfigurableused = [];
    for (let elt of this.listServicesConfigurable) {
      for (let relation of this.relationTabConfigurable) {
        if (relation.includes(elt.serviceName)) {
          this.listServicesConfigurableused.push(elt);
        }
      }
    }
    for (let elt of this.listServicesConfigurable) {
      for (let recette of this.recetteTabConfigurable) {
        if (recette.includes(elt.serviceName)) {
          this.listServicesConfigurableused.push(elt);
        }
      }
    }
    console.log("HAHAHHA", this.listServicesConfigurableused);
    let listServicesConfigurableusedUnique = [
      ...new Set(this.listServicesConfigurableused),
    ];

    console.log("teste", listServicesConfigurableusedUnique);

    console.log("relation", this.relationTabConfigurable);
    console.log("recette", this.recetteTabConfigurable);

    var temp = listServicesConfigurableusedUnique.concat(
      this.relationTabConfigurable
    );
    var preferencestemp = temp.concat(this.recetteTabConfigurable);
    for (let per of preferencestemp) {
      var json = { preference: per, active: true };
      this.preferences.push(json);
    }
    console.log(this.preferences);
    this.testentriesCong = false;
    this.preferenceUtilisaturs = true;
  }
  resultPage() {
    console.log("preference", this.preferences);
    console.log("operators preference", this.mappingOperators);
    this.testentriesCong = false;
    this.preferenceUtilisaturs = false;
    this.resultConfigTab = [];
    for (let pre of this.preferences) {
      if (typeof pre.preference === "string") {
        if (pre.active == false) {
          var strNew =
            pre.preference.substring(1, pre.preference.indexOf("=") + 1) +
            "null";

          this.resultConfigTab.push(strNew);
          //console.log(this.resultConfigTab);
        } else {
          var strTochange = pre.preference;
          for (let pref of this.preferences) {
            // console.log("pref",pref );
            //console.log("pre",pre );
            if (typeof pref.preference == "string") {
              if (pref.active == false) {
                strTochange = strTochange.replace(
                  pref.preference.substring(0, pref.preference.indexOf("=")),
                  ""
                );
              } else {
                strTochange = strTochange.replace(
                  pref.preference.substring(0, pref.preference.indexOf("=")),
                  pref.preference.substring(1, pref.preference.indexOf("="))
                );
              }
            } else {
              if (pref.active == false) {
                if (strTochange.includes("=Ts_extend")) {
                  strTochange = strTochange.replace(
                    pref.preference.serviceName,
                    ""
                  );
                }
                if (strTochange.includes("CFilter")) {
                  if (this.relation.p === "LABEL") {
                    strTochange = strTochange.replace(
                      "( Name," + pref.preference.serviceName + " )",
                      ""
                    );
                  }
                  if (this.relation.p === "TYPE") {
                    strTochange = strTochange.replace(
                      "( Type," + pref.preference.serviceType + " )",
                      ""
                    );
                  }
                  if (this.relation.p === "CATEGORY") {
                    strTochange = strTochange.replace(
                      "( Category," +
                        pref.preference.entitie.entitieCategory +
                        ")",
                      ""
                    );
                  }
                  if (this.relation.p === "OWNER") {
                    strTochange = strTochange.replace(
                      "( Owner," + pref.preference.entitie.entitieOwner + ")",
                      ""
                    );
                  }
                  if (this.relation.p === "VENDOR") {
                    strTochange = strTochange.replace(
                      "( Vendor," + pref.preference.entitie.entitieVendor + ")",
                      ""
                    );
                  }
                  strTochange = strTochange.replace(
                    pref.preference.serviceName,
                    ""
                  );
                } else {
                  while (
                    strTochange.indexOf(
                      "CEvaluate(" + pref.preference.serviceName + ") "
                    ) != -1
                  ) {
                    strTochange = strTochange.replace(
                      "CEvaluate(" + pref.preference.serviceName + ") ",
                      ""
                    );
                  }
                }
              } else {
                if (!strTochange.includes("=Ts_extend")) {
                  while (
                    strTochange.indexOf(
                      "CEvaluate(" + pref.preference.serviceName + ") "
                    ) != -1
                  ) {
                    strTochange = strTochange.replace(
                      "CEvaluate(" + pref.preference.serviceName + ") ",
                      "Evaluate(" + pref.preference.serviceName + ") "
                    );
                  }
                }
              }
            }
          }

          if (!strTochange.startsWith("R")) {
            if (!strTochange.includes("=Ts_extend")) {
              for (let op of this.mapUsedOperators.get(pre.preference)) {
                while (strTochange.indexOf(op.configOperator) != -1) {
                  strTochange = strTochange.replace(
                    op.configOperator,
                    op.staticOperator
                  );
                }
              }

              //Réplacer sequence par ,
              //if (strTochange.includes(op.configOperator))
              while (strTochange.indexOf("Séquence") != -1) {
                strTochange = strTochange.replace("Séquence", ",");
              }
            }
          }

          //Conditionnel
          if (
            strTochange.startsWith("R") &&
            this.relation.controlType === "CONDITIONEL"
          ) {
            for (let op of this.mapUsedOperators.get(pre.preference)) {
              while (strTochange.indexOf(op.configOperator) != -1) {
                strTochange = strTochange.replace(
                  op.configOperator,
                  op.staticOperator
                );
              }
            }

            //Réplacer sequence par ,
            //if (strTochange.includes(op.configOperator))
            while (strTochange.indexOf("Séquence") != -1) {
              strTochange = strTochange.replace("Séquence", ",");
            }
          }

          //  console.log(pre.preference);
          while (strTochange.indexOf("CEvaluate") != -1) {
            strTochange = strTochange.replace("CEvaluate", "Evaluate");
          }
          while (strTochange.indexOf("CFilter") != -1) {
            strTochange = strTochange.replace("CFilter", "Filter");
          }

          console.log("----------------------------- ", strTochange);

          //regler l'ouput apres evaluation de null sous condition qu'on utilise toujoures le meme operateur
          if (
            !strTochange.includes("=Ts_extend") &&
            !strTochange.includes("Filter") &&
            !strTochange.startsWith("R")
          ) {
            let tab = null;
            if (strTochange.includes("PRECOND")) {
              tab = strTochange.split("PRECOND");
            } else if (strTochange.includes("IF")) {
              tab = strTochange.split("IF");
            } else if (strTochange.includes("INPUT")) {
              tab = strTochange.split("INPUT");
            }
            if (tab[0].includes("Empty")) {
              if (this.relation.nombreAction == 1) {
                if (tab[1].includes("Empty")) {
                  const tab1 = strTochange.split("=");
                  strTochange = tab1[0] + " = null";
                } else {
                  const tab1 = strTochange.split("=");
                  strTochange = tab1[0] + " = null PRECOND " + tab[1];
                }
              } else if (this.relation.nombreAction == 2) {
                let action = "";
                const tab_actions = tab[0].split(",");
                if (tab_actions[0].includes("Empty")) {
                  if (tab_actions[1].includes("Empty")) {
                    action = "null";
                  } else {
                    action = tab_actions[1];
                  }
                } else {
                  action = tab_actions[0];
                  if (!tab_actions[1].includes("Empty")) {
                    action = tab[0];
                  }
                }
                if (action === "null") {
                  if (tab[1].includes("Empty")) {
                    const tab1 = strTochange.split("=");
                    strTochange = tab1[0] + " = null";
                  } else {
                    const tab1 = strTochange.split("=");
                    strTochange = tab1[0] + " = null PRECOND " + tab[1];
                  }
                } else {
                  if (tab[1].includes("Empty")) {
                    const tab1 = strTochange.split("=");
                    strTochange = tab1[0] + " = " + action;
                  }
                }
              }
            } else {
              if (tab[1].includes("Empty")) {
                strTochange = tab[0];
              }
            }
          }

          // pre.preference=pre.preference.substring(1,pre.preference.length);
          this.resultConfigTab.push(strTochange);
        }
      }
    }
    console.log(this.resultConfigTab);
    this.finalResultConfigTab = [];
    for (let chaine of this.resultConfigTab) {
      while (
        chaine.indexOf("AND AND") != -1 ||
        chaine.indexOf("AND OR") != -1 ||
        chaine.indexOf("AND XOR") != -1 ||
        chaine.indexOf("OR AND") != -1 ||
        chaine.indexOf("OR OR") != -1 ||
        chaine.indexOf("OR XOR") != -1 ||
        chaine.indexOf("XOR AND") != -1 ||
        chaine.indexOf("XOR OR") != -1 ||
        chaine.indexOf("XOR XOR") != -1 ||
        chaine.indexOf("PRECOND  AND") != -1 ||
        chaine.indexOf("PRECOND  OR") != -1 ||
        chaine.indexOf("PRECOND  XOR") != -1 ||
        chaine.indexOf("PRECOND  ,") != -1 ||
        chaine.indexOf("IF  AND") != -1 ||
        chaine.indexOf("IF  OR") != -1 ||
        chaine.indexOf("IF  XOR") != -1 ||
        chaine.indexOf("IF  ,") != -1 ||
        chaine.indexOf("AND  IF") != -1 ||
        chaine.indexOf("OR  IF") != -1 ||
        chaine.indexOf("XOR  IF") != -1 ||
        chaine.indexOf(",  IF") != -1 ||
        chaine.indexOf("AND  AND") != -1 ||
        chaine.indexOf("AND  OR") != -1 ||
        chaine.indexOf("AND  XOR") != -1 ||
        chaine.indexOf("AND  ,") != -1 ||
        chaine.indexOf("INPUT(  AND") != -1 ||
        chaine.indexOf("INPUT(  OR") != -1 ||
        chaine.indexOf("INPUT(  XOR") != -1 ||
        chaine.indexOf("INPUT(  ,") != -1 ||
        chaine.indexOf("AND  INPUT(") != -1 ||
        chaine.indexOf("OR  INPUT(") != -1 ||
        chaine.indexOf("XOR  INPUT(") != -1 ||
        chaine.indexOf(",  INPUT(") != -1 ||
        chaine.indexOf("(AND") != -1 ||
        chaine.indexOf("(OR") != -1 ||
        chaine.indexOf("(XOR") != -1 ||
        chaine.indexOf("AND (") != -1 ||
        chaine.indexOf("OR (") != -1 ||
        chaine.indexOf("XOR (") != -1 ||
        chaine.indexOf("AND  (") != -1 ||
        chaine.indexOf("OR  (") != -1 ||
        chaine.indexOf("XOR  (") != -1 ||
        chaine.indexOf(",)") != -1 ||
        chaine.indexOf(",   )") != -1 ||
        chaine.indexOf("(   ,") != -1 ||
        chaine.indexOf("(,") != -1
      ) {
        chaine = chaine
          .replace("AND AND", "AND")
          //.replace("AND OR", "OR")
          //.replace("AND XOR", "XOR")
          //.replace("OR AND", "AND")
          .replace("OR OR", "OR")
          // .replace("OR XOR", "XOR")
          // .replace("XOR AND", "AND")
          //  .replace("XOR OR", "OR")
          .replace("XOR XOR", "XOR")
          .replace("PRECOND  AND", "PRECOND")
          .replace("PRECOND  OR", "PRECOND")
          .replace("PRECOND  XOR", "PRECOND")
          .replace("PRECOND  ,", "PRECOND")
          //lst relation
          .replace("IF  AND", "IF")
          .replace("IF  OR", "IF")
          .replace("IF  XOR", "IF")
          .replace("IF  ,", "IF")

          .replace("AND  IF", "IF")
          .replace("OR  IF", "IF")
          .replace("XOR  IF", "IF")
          .replace(",  IF", "IF")

          .replace("AND  AND", "AND")
          .replace("AND  OR", "AND")
          .replace("AND  XOR", "AND")
          .replace("AND  ,", "AND")

          .replace("INPUT(  AND", "INPUT(")
          .replace("INPUT(  OR", "INPUT(")
          .replace("INPUT(  XOR", "INPUT(")
          .replace("INPUT(  ,", "INPUT(")
          .replace("AND INPUT(", "INPUT(")
          .replace("OR INPUT(", "INPUT(")
          .replace("XOR INPUT(", "INPUT(")
          .replace(", INPUT(", "INPUT(")
          .replace("(AND", "(")
          .replace("(OR", "(")
          .replace("(XOR", "(")
          .replace("AND (", " (")
          .replace("OR (", " (")
          .replace("XOR (", " (")
          .replace("AND  (", " (")
          .replace("OR  (", " (")
          .replace("XOR  (", " (")
          .replace("(  ,", "(")
          .replace("(   ,", "(")
          .replace(",   )", ")")
          .replace(",   )", ")");
      }
      var pos = chaine.indexOf("=");
      console.log(chaine.indexOf("AND"));
      if (chaine.indexOf("AND") == pos + 2) {
        console.log("here---");
        chaine =
          chaine.substring(0, pos + 1) +
          " " +
          chaine.substring(pos + 5, chaine.length);
        console.log("ch", chaine);
      } else if (chaine.indexOf("OR") == pos + 2) {
        chaine =
          chaine.substring(0, pos + 1) +
          " " +
          chaine.substring(pos + 4, chaine.length);
      } else if (chaine.indexOf("XOR") == pos + 2) {
        chaine =
          chaine.substring(0, pos + 1) +
          " " +
          chaine.substring(pos + 5, chaine.length);
      }
      if (chaine.indexOf("AND") == chaine.length - 4) {
        chaine = chaine.substring(0, chaine.length - 4);
        console.log("ch", chaine);
      } else if (chaine.indexOf("OR") == chaine.length - 3) {
        chaine = chaine.substring(0, chaine.length - 3);
        console.log("ch", chaine);
      } else if (chaine.indexOf("XOR") == chaine.length - 4) {
        chaine = chaine.substring(0, chaine.length - 4);
        console.log("ch", chaine);
      } else if (chaine.indexOf("PRECOND") == chaine.length - 8) {
        chaine = chaine.substring(0, chaine.length - 8);
        console.log("ch", chaine);
      }

      if (strTochange.includes("=Ts_extend")) {
        while (chaine.indexOf(", ,") != -1) {
          chaine = chaine.replace(", ,", " ,");
        }
        while (chaine.indexOf("[ ,") != -1) {
          chaine = chaine.replace("[ ,", "[");
        }
        while (chaine.indexOf("[,") != -1) {
          chaine = chaine.replace("[,", "[");
        }
        while (chaine.indexOf(",  ]") != -1) {
          chaine = chaine.replace(",  ]", "]");
        }
        while (chaine.indexOf(",]") != -1) {
          chaine = chaine.replace(",]", "]");
        }
      }

      //Test si la relation est extend et vide
      if (chaine.includes("Ts_extend [  ]")) {
        chaine = chaine.replace("Ts_extend [  ]", "null");
      }
      //Test si la relation est extend et vide
      if (chaine.includes("Filter ( (   )  )")) {
        chaine = chaine.replace("Evaluate( Filter ( (   )  ) )", "null");
      }
      if (chaine.includes("Filter ( OR  (  ,   )  )")) {
        chaine = chaine.replace("Evaluate( Filter ( OR  (  ,   )  ) )", "null");
      }
      if (chaine.includes("Filter ( XOR  (  ,   )  )")) {
        chaine = chaine.replace(
          "Evaluate( Filter ( XOR  (  ,   )  ) )",
          "null"
        );
      }
      if (chaine.includes("Filter ( AND  (  ,   )  )")) {
        chaine = chaine.replace(
          "Evaluate( Filter ( AND  (  ,   )  ) )",
          "null"
        );
      }
      this.finalResultConfigTab.push(chaine);
    }
    this.resultConfig = true;
    //this.preferenceUtilisaturs=true;
    console.log(this.resultConfig);
  }
}
