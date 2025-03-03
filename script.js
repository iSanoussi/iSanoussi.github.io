{
  "nbformat": 4,
  "nbformat_minor": 0,
  "metadata": {
    "colab": {
      "provenance": [],
      "authorship_tag": "ABX9TyM9r4Gm1DW7A38fpR+DsFiB",
      "include_colab_link": true
    },
    "kernelspec": {
      "name": "python3",
      "display_name": "Python 3"
    },
    "language_info": {
      "name": "python"
    }
  },
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {
        "id": "view-in-github",
        "colab_type": "text"
      },
      "source": [
        "<a href=\"https://colab.research.google.com/github/iSanoussi/iSanoussi.github.io/blob/main/script.js\" target=\"_parent\"><img src=\"https://colab.research.google.com/assets/colab-badge.svg\" alt=\"Open In Colab\"/></a>"
      ]
    },
    {
      "cell_type": "code",
      "execution_count": null,
      "metadata": {
        "id": "jYzMT_JmFCFT"
      },
      "outputs": [],
      "source": [
        "// Menu mobile\n",
        "const mobileMenu = document.getElementById('mobile-menu');\n",
        "const navLinks = document.querySelector('.nav-links');\n",
        "\n",
        "mobileMenu.addEventListener('click', () => {\n",
        "    navLinks.classList.toggle('active');\n",
        "});"
      ]
    }
  ]
}