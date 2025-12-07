export default class Ajax {
  constructor(options = {}) {
    this.defaults = {
      baseURL: "",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    };
  }

  async request(method, url, data = null, options = {}) {
    const config = {
      ...this.defaults,
      ...options,
      headers: {
        ...this.defaults.headers,
        ...(options.headers || {})
      }
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    const fetchOptions = {
      method,
      headers: config.headers,
      signal: controller.signal
    };

    if (data) {
      fetchOptions.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(config.baseURL + url, fetchOptions);
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw new Error(error.message || "Network error");
    }
  }

  async get(url, options = {}) {
    return this.request("GET", url, null, options);
  }

  async post(url, data, options = {}) {
    return this.request("POST", url, data, options);
  }

  async put(url, data, options = {}) {
    return this.request("PUT", url, data, options);
  }

  async delete(url, options = {}) {
    return this.request("DELETE", url, null, options);
  }
}
