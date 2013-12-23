

public void MeasurementsChanged()
{
	var temp = GetTemp();
	var humidity = GetHumidity();
	var windPower = GetWindPower();
    if (temp > 5)
    {
        seedingMachine.Start();

        if (humidity > 65)
            reapingMachine.Start();
    }

    if (temp > 10 && humidity < 55 && windPower < 4)
        wateringMachine.Start();
} 


public class SeedingMachineObserver : IObserver<WeatherData>
{
	public void OnNext(WeatherData weatherData)
	{
		seedingMachine.Start();
	}
}


var weatherData = GetWeatherData();
var seedingMachineObservable = from data in weatherData where data.Temp > 5 select data;
seedingMachineObservable.Subscribe(new SeedingMachineObserver());




public class Actor<T> : IObserver<T>, IObservable<T>
{
	public void Receive(T t)
	{
		this.OnNext(t);
	}

	public void Post(T t)
	{
		var receiver = new Actor<T>();
		receiver.Subscribe(this);
	}
}










