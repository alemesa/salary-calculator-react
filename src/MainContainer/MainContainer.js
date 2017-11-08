import React, { Component } from 'react';
import './MainContainer.css';
import Prize from '../Prize/Prize';
import data from '../util/canada.json';
import animate from '@jam3/gsap-promise';

const brackets = data.brackets;
const provinces = data.data;

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'Canada',
      province: 'ontario',
      hourlyRate: 10,
      hours: 8,
      taxes: false,
      monthlySalary: 0,
      yearlySalary: 0,
      pureYearlySalary: 0,
      finalTax: 0
    };
  }

  componentDidMount() {
    // Animations
    animate.fromTo('.MainContainer', 1, { autoAlpha: 0 }, { autoAlpha: 1 });
    animate.staggerFromTo(
      'input',
      0.5,
      { x: 50, y: 50, autoAlpha: 0 },
      {
        delay: 0.5,
        x: 0,
        y: 0,
        autoAlpha: 1
      },
      0.1
    );
    animate.staggerFromTo(
      'select',
      0.5,
      { x: -50, y: -50, autoAlpha: 0 },
      {
        delay: 0.5,
        x: 0,
        y: 0,
        autoAlpha: 1
      },
      0.1
    );
    // Initial State Calculation
    this.setState({
      monthlySalary:
        this.state.hourlyRate * this.state.hours * 22 * (1 - this.findTax()),
      yearlySalary:
        this.state.hourlyRate *
        this.state.hours *
        22 *
        12 *
        (1 - this.findTax()),
      pureYearlySalary: this.state.hourlyRate * this.state.hours * 22 * 12
    });
  }

  findTax = () => {
    let finalTax = 0;
    if (!this.state.taxes) {
      finalTax = 0;
    } else if (this.state.taxes) {
      if (this.state.pureYearlySalary > brackets[4].min) {
        finalTax =
          brackets[4].rate + brackets[4].rate * provinces[this.state.province];
      } else if (this.state.pureYearlySalary > brackets[3].min) {
        finalTax =
          brackets[3].rate + brackets[3].rate * provinces[this.state.province];
      } else if (this.state.pureYearlySalary > brackets[2].min) {
        finalTax =
          brackets[2].rate + brackets[2].rate * provinces[this.state.province];
      } else if (this.state.pureYearlySalary > brackets[1].min) {
        finalTax =
          brackets[1].rate + brackets[1].rate * provinces[this.state.province];
      } else if (this.state.pureYearlySalary > brackets[0].min) {
        finalTax =
          brackets[0].rate + brackets[0].rate * provinces[this.state.province];
      }
    }
    this.setState({
      finalTax: finalTax
    });
    return finalTax;
  };

  updateStuff = () => {
    this.setState({
      monthlySalary: (this.state.hourlyRate *
        this.state.hours *
        22 *
        (1 - this.findTax())
      ).toFixed(2),
      yearlySalary: (this.state.hourlyRate *
        this.state.hours *
        22 *
        12 *
        (1 - this.findTax())
      ).toFixed(2),
      pureYearlySalary: (this.state.hourlyRate *
        this.state.hours *
        22 *
        12
      ).toFixed(2)
    });
  };

  handleProvinceChange = e => {
    this.setState(
      {
        province: e.target.value
      },
      this.updateStuff
    );
  };
  handleCountryChange = e => {};
  handleSalaryChange = e => {
    this.setState({
      hourlyRate: parseFloat(e.target.value),
      monthlySalary: (parseFloat(e.target.value) *
        this.state.hours *
        22 *
        (1 - this.findTax())
      ).toFixed(2),
      yearlySalary: (parseFloat(e.target.value) *
        this.state.hours *
        22 *
        12 *
        (1 - this.findTax())
      ).toFixed(2),
      pureYearlySalary: (parseFloat(e.target.value) *
        this.state.hours *
        22 *
        12
      ).toFixed(2)
    });
  };
  handleHoursChange = e => {
    this.setState({
      hours: parseFloat(e.target.value),
      monthlySalary: (this.state.hourlyRate *
        parseFloat(e.target.value) *
        22 *
        (1 - this.findTax())
      ).toFixed(2),
      yearlySalary: (this.state.hourlyRate *
        parseFloat(e.target.value) *
        22 *
        12 *
        (1 - this.findTax())
      ).toFixed(2),
      pureYearlySalary: (this.state.hourlyRate *
        parseFloat(e.target.value) *
        22 *
        12
      ).toFixed(2)
    });
  };
  handleAfterOrBeforeChange = e => {
    if (e.target.value === 'before') {
      this.setState(
        {
          taxes: false
        },
        this.updateStuff
      );
    } else if (e.target.value === 'after') {
      this.setState(
        {
          taxes: true
        },
        this.updateStuff
      );
    }
  };
  handleMonthlyChange = e => {
    this.setState({
      hourlyRate: (parseFloat(e.target.value) / 22 / 8).toFixed(2),
      monthlySalary: parseFloat(e.target.value) * (1 - this.findTax()),
      yearlySalary: (parseFloat(e.target.value) *
        12 *
        (1 - this.findTax())
      ).toFixed(2),
      pureYearlySalary: (parseFloat(e.target.value) * 12).toFixed(2)
    });
  };
  handleYearlyChange = e => {
    this.setState({
      hourlyRate: (parseFloat(e.target.value) / 22 / 8 / 12).toFixed(2),
      monthlySalary: (parseFloat(e.target.value) *
        (1 - this.findTax()) /
        12
      ).toFixed(2),
      yearlySalary: parseFloat(e.target.value) * (1 - this.findTax()),
      pureYearlySalary: parseFloat(e.target.value).toFixed(2)
    });
  };
  render() {
    return (
      <div className="MainContainer">
        <div id="wrapper">
          <h2>
            If you are from
            <select id="province-select" onChange={this.handleProvinceChange}>
              <option value="ontario">ON</option>
              <option value="alberta">AB</option>
              <option value="british_columbia">BC</option>
              <option value="manitoba">MB</option>
              <option value="new_brunswick">NB</option>
              <option value="newfoundland_labrador">NL</option>
              <option value="northwest_territories">NT</option>
              <option value="nova_scotia">NS</option>
              <option value="nunavut">NU</option>
              <option value="prince_edward_island">PE</option>
              <option value="quebec">QC</option>
              <option value="saskatchewan">SK</option>
              <option value="yukon">YT</option>
            </select>
            ,
            <select id="country-select" onChange={this.handleCountryChange}>
              <option value="canada">Canada</option>
            </select>
            and make $
            <input
              id="hourly-rate"
              type="number"
              placeholder="20"
              value={this.state.hourlyRate}
              onChange={this.handleSalaryChange}
            />
            /hr for
            <input
              id="hours"
              type="number"
              placeholder="8"
              value={this.state.hours}
              onChange={this.handleHoursChange}
            />
            hrs. Your monthly salary
            <select
              id="before-after-select"
              onChange={this.handleAfterOrBeforeChange}
            >
              <option value="before">before</option>
              <option value="after">after</option>
            </select>
            taxes will be $
            <input
              readOnly
              id="monthly-salary"
              type="number"
              placeholder="3000"
              onChange={this.handleMonthlyChange}
              value={this.state.monthlySalary}
            />
            and your yearly salary will be $
            <input
              readOnly
              id="yearly-salary"
              type="number"
              placeholder="40000"
              onChange={this.handleYearlyChange}
              value={this.state.yearlySalary}
            />
          </h2>

          {/* s */}
        </div>
      </div>
    );
  }
}
MainContainer.propTypes = {};
MainContainer.defaultProps = {};
export default MainContainer;
